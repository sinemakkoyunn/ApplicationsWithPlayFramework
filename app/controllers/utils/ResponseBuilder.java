package controllers.utils;

import controllers.result.JsonResult;
import controllers.result.TextResult;
import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
import org.apache.commons.lang.StringUtils;
import org.bson.types.ObjectId;
import play.Play;
import play.data.validation.Error;
import play.data.validation.Validation;
import play.exceptions.UnexpectedException;
import play.i18n.Messages;
import play.mvc.Http;

import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.*;

public class ResponseBuilder {

    protected static final List<String> reserved = Arrays.asList("status", "errors", "messages");
    protected static final DateTransformer DATE_TRANSFORMER = new DateTransformer("dd/MM/yyyy HH:mm");

    protected JSONSerializer jsonSerializer;
    protected Stack<Boolean> conditions = new Stack<>();
    protected Map<String, Object> response = new LinkedHashMap<>(2);
    protected Map<String, Object> meta = new LinkedHashMap<>();
    protected List<Object> results = new LinkedList<>();
    protected List<String> messages = new LinkedList<>();
    protected Map<String, List<String>> errors = new LinkedHashMap<>();

    protected ResponseBuilder(int status) {
        jsonSerializer = new JSONSerializer()
                .transform(new ObjectIdTransformer(), ObjectId.class)
                .transform(DATE_TRANSFORMER, Date.class)
                .prettyPrint(Play.mode.isDev())
                .exclude("*.class", "*.persistent", "*.entityId")
                .include("results", "meta.errors.*", "meta.messages");

        response.put("meta", meta);
        response.put("results", results);

        meta.put("status", status);
        meta.put("errors", errors);
        meta.put("messages", messages);
    }

    public static ResponseBuilder create() {
        return new ResponseBuilder(200);
    }

    public static ResponseBuilder create(int status) {
        return new ResponseBuilder(status);
    }

    public static ResponseBuilder validate() {
        final ResponseBuilder responseBuilder = ResponseBuilder.create();
        Validation validation = Validation.current();
        final String message = !validation.errors().isEmpty() ? validation.errors().get(0).message() : null;
        return responseBuilder
                .beginCondition(validation.hasErrors())
                .setStatus(400)
                .addErrors(validation.errors())
                .addMessage(message)
                .renderAsJson()
                .endCondition();
    }

    public ResponseBuilder beginCondition(final boolean condition) {
        this.conditions.push(condition);
        return this;
    }

    public ResponseBuilder endCondition() {
        this.conditions.pop();
        return this;
    }

    public ResponseBuilder isDev() {
        return this.beginCondition(Play.mode.isDev());
    }

    public ResponseBuilder isProd() {
        return this.beginCondition(Play.mode.isProd());
    }

    public ResponseBuilder isNull(Object object) {
        return this.beginCondition(object == null);
    }

    public ResponseBuilder isNot(boolean condition) {
        return this.beginCondition(!condition);
    }

    public ResponseBuilder isBlank(String input) {
        return this.beginCondition(StringUtils.isBlank(input));
    }

    public ResponseBuilder hasErrors() {
        return this.beginCondition(!this.errors.isEmpty());
    }

    private boolean composedState() {
        for (boolean c : this.conditions) {
            if (!c) return false;
        }
        return true;
    }

    protected boolean conditionState() {
        return this.conditions.isEmpty() || this.composedState();
    }

    public ResponseBuilder setStatus(int status) {
        if (!conditionState()) return this;

        meta.put("status", status);
        return this;
    }

    public ResponseBuilder addMeta(final String key, final Object value) {
        if (!conditionState()) return this;

        if (reserved.contains(key))
            throw new UnexpectedException("reserved-key");

        meta.put(key, value);
        return this;
    }

    public ResponseBuilder addMessage(final String message, Object... args) {
        if (!conditionState()) return this;

        messages.add(Messages.get(message, args));
        return this;
    }

    public ResponseBuilder addError(Error error) {
        return addError(error.getKey(), error.message());
    }

    public ResponseBuilder addErrors(List<Error> errors) {
        for (Error error : errors) {
            addError(error);
        }
        return this;
    }

    public ResponseBuilder addError(final String key, final String error, Object... args) {
        if (!conditionState()) return this;

        List<String> value = errors.get(key);

        if (value == null) {
            value = new LinkedList<>();
            errors.put(key, value);
        }

        value.add(Messages.get(error, args));
        return this;
    }

    public ResponseBuilder addResult(final Object result) {
        if (!conditionState()) return this;

        results.add(result);
        return this;
    }

    public ResponseBuilder addResult(final Object key, final Object result) {
        if (!conditionState()) return this;

        Map<String, Object> map = new HashMap<>(1);
        map.put(key.toString(), result);
        results.add(map);
        return this;
    }

    public ResponseBuilder addResult(final Object key1, final Object result1,
                                     final Object key2, final Object result2) {
        if (!conditionState()) return this;

        Map<String, Object> map = new HashMap<>(2);
        map.put(key1.toString(), result1);
        map.put(key2.toString(), result2);
        results.add(map);
        return this;
    }

    public ResponseBuilder addResult(final Object key1, final Object result1,
                                     final Object key2, final Object result2,
                                     final Object key3, final Object result3) {
        if (!conditionState()) return this;

        Map<String, Object> map = new HashMap<>(3);
        map.put(key1.toString(), result1);
        map.put(key2.toString(), result2);
        map.put(key3.toString(), result3);
        results.add(map);
        return this;
    }

    public ResponseBuilder addResults(final List results) {
        if (!conditionState()) return this;

        this.results.addAll(results);
        return this;
    }

    public ResponseBuilder mergeResult(int index, final String key, final Function1<Object> result) {
        if (!conditionState()) return this;

        ((Map<String, Object>) this.results.get(index)).put(key, result.apply());
        return this;
    }

    public ResponseBuilder mergeResult(final String key, final Function1<Object> result) {
        return mergeResult(0, key, result);
    }

    public ResponseBuilder include(String... fields) {
        if (!conditionState()) return this;

        for (String field : fields)
            jsonSerializer.include("results." + field);

        return this;
    }

    public ResponseBuilder exclude(String... fields) {
        if (!conditionState()) return this;

        for (String field : fields)
            jsonSerializer.exclude("results." + field);

        return this;
    }

    public String getAsJson() {
        return jsonSerializer.serialize(response);
    }

    public String getAsText() {
        StringBuilder stringBuilder = new StringBuilder();
        for (Object result : results) {
            stringBuilder.append(result).append("\n");
        }
        return stringBuilder.toString();
    }

    public ResponseBuilder printAsJson(Writer writer) {
        if (!conditionState()) return this;

        try {
            writer.write("\n---------------------------\n");
            jsonSerializer.serialize(response, writer);
            writer.write("\n---------------------------\n");
            writer.flush();
        } catch (IOException ignored) {
            throw new UnexpectedException(ignored);
        }
        return this;
    }

    public ResponseBuilder printAsJson(PrintStream out) {
        return printAsJson(new PrintWriter(out, true));
    }

    public ResponseBuilder printAsJson() {
        return printAsJson(System.out);
    }

    public ResponseBuilder renderAsJson() {
        if (!conditionState()) return this;

        final String json = this.getAsJson();
        throw new JsonResult((Integer) meta.get("status"), json);
    }

    public ResponseBuilder renderAsText() {
        if (!conditionState()) return this;

        throw new TextResult((Integer) meta.get("status"), this.getAsText());
    }

    public ResponseBuilder render() {
        final String format = Http.Request.current().format;
        switch (format) {
            case "txt":
                return renderAsText();
            default:
                return renderAsJson();
        }
    }

    /**
     * Function interface for lazy evaluation
     * Fuck you Java.
     *
     * @param <T> Fonksiyonun donus tipi
     */
    public static interface Function1<T> {
        T apply();
    }
}
