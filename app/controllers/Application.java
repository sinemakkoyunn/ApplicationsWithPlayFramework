package controllers;

import play.mvc.*;


import models.*;

import java.util.List;

public class Application extends Controller {

    public static void index() {
        render();
    }

    /**
     * insan ekleme sayfasını getirir
     */
    public static void insanEklemeFormuV1() {render(); }

    /**
     * sayfa geldıkten sonra sayfadaki formu kayıt eder
     * @param insan
     */
    public static void insanEkleV1(Insan insan) {
        insan.save();
        insanListeleV1();
    }

    /**
     * kayıt edilmiş insanlarla beraber listeleme sayfasını getirir
     */
    public static void insanListeleV1() {
        List<Insan> insanList = Insan.findAll();
        render(insanList);
    }

    /**
     * Flight.js kullanılan sayfayı cagırır
     */
    public static void insanlar() { render(); }
}
