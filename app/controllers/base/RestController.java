package controllers.base;

import annotations.Ajax;
import controllers.utils.ResponseBuilder;
import play.Logger;
import play.i18n.Messages;
import play.mvc.Before;
import play.mvc.Catch;
import play.mvc.Controller;
import play.mvc.Util;

import java.util.List;

public class RestController extends Controller {

    private static final String RESPONSE_BUILDER_KEY = "__RESPONSE_BUILDER_";

    @Before(priority = 1)
    static void before() {
        if(getActionAnnotation(Ajax.class) != null && !request.isAjax()) {
            notFound();
        }
        request.args.put(RESPONSE_BUILDER_KEY, ResponseBuilder.validate());
    }

    @Catch
    static void exception(Throwable throwable) {
        Logger.error(throwable, throwable.getMessage());
        final String key = throwable.getLocalizedMessage();
        responseBuilder().setStatus(500).addMessage(Messages.get(key == null ? "unknown" : key)).render();
    }

    public static ResponseBuilder responseBuilder() {
        return (ResponseBuilder) request.args.get(RESPONSE_BUILDER_KEY);
    }

    @Util
    public static ResponseBuilder sarmala(int sayfa, int adet, long toplam, List sonuclar) {
        return ResponseBuilder.create()
            .addMeta("sayfa", sayfa)
            .addMeta("adet", adet)
            .addMeta("toplam", toplam)
            .addMeta("ilk", (sayfa - 1) * adet + 1)
            .addMeta("son", (sayfa - 1) * adet + sonuclar.size())
            .addResults(sonuclar);
    }

}
