package controllers.result;


import play.exceptions.UnexpectedException;
import play.mvc.Http;
import play.mvc.results.Result;

public class TextResult extends Result {

    private int status;
    private String text;

    public TextResult(int status, String text) {
        this.status = status;
        this.text = text;
    }

    @Override
    public void apply(Http.Request request, Http.Response response) {
        try {
            response.status = this.status;
            setContentTypeIfNotSet(response, "text/plain; charset=" + Http.Response.current().encoding);
            response.out.write(text.getBytes(getEncoding()));
        } catch (Exception e) {
            throw new UnexpectedException(e);
        }
    }

}
