package controllers.utils;

import play.mvc.Http;

import java.io.*;
import java.util.zip.GZIPOutputStream;

public class GzipResponse {

    private GzipResponse() {
    }

    /**
     * gzip response if supported by the client
     */
    public static void compress(final Http.Request request, final Http.Response response, byte[] content) throws IOException {
        if (isGzipSupported(request)) {
            // change to a gzipped stream
            final ByteArrayOutputStream gzip = getGzipStream(content);
            // set response header
            response.setHeader("Content-Encoding", "gzip");
            response.setHeader("Content-Length", gzip.size() + "");
            response.out = gzip;
        } else {
            response.out.write(content);
        }
    }

    /**
     * @return Whether the request browser supports GZIP encoding
     */
    public static boolean isGzipSupported(final Http.Request request) {
        // key must be lower-case.
        final Http.Header encodingHeader = request.headers.get("accept-encoding");
        return (encodingHeader != null && encodingHeader.value().contains("gzip"));
    }

    /**
     * creates a gzipped ByteArrayOutputStream which can be used as response.out
     */
    public static ByteArrayOutputStream getGzipStream(final byte[] input) throws IOException {
        final InputStream inputStream = new ByteArrayInputStream(input);
        final ByteArrayOutputStream stringOutputStream = new ByteArrayOutputStream(input.length);
        final OutputStream gzipOutputStream = new GZIPOutputStream(stringOutputStream);
        final byte[] buf = new byte[8192];
        int len;
        while ((len = inputStream.read(buf)) > 0) {
            gzipOutputStream.write(buf, 0, len);
        }
        inputStream.close();
        gzipOutputStream.close();
        return stringOutputStream;
    }

}
