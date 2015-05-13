package controllers.result;


import controllers.utils.GzipResponse;
import play.exceptions.UnexpectedException;
import play.mvc.Http;
import play.mvc.results.Result;

public class JsonResult extends Result {

    private int status;
    private String json;

    public JsonResult(int status, String json) {
        this.status = status;
        this.json = json;
    }

    @Override
    public void apply(Http.Request request, Http.Response response) {
        try {
            response.status = this.status;
            String encoding = this.getEncoding();
            this.setContentTypeIfNotSet(response, "application/json; charset=" + encoding);
            GzipResponse.compress(request, response, this.json.getBytes(encoding));
        } catch (Exception e) {
            throw new UnexpectedException(e);
        }
    }
}
