package controllers.rest;

import annotations.Ajax;
import controllers.base.RestController;
import models.Insan;

import javax.validation.Valid;
import java.util.List;

public class Insanlar extends RestController {

    /**
     * ajax ile yeni insan ekler
     *
     * @param insan
     */
    @Ajax
    public static void insanEkle(@Valid Insan insan) {
        insan.save();
        responseBuilder()
            .include("tamAd", "dogumTarihi", "kullaniciAdi", "dogumYeri")
            .exclude("*")
            .renderAsJson();
    }

    /**
     * ajax ile sistemde kayıtlı olan insanları cağırır
     * 
     * @param sayfa
     * @param adet
     */
    @Ajax
    public static void insanlariListele(Integer sayfa, Integer adet) {
        if (sayfa == null) sayfa = 1;
        if (adet == null) adet = 10;

        List<Insan> insanlar = Insan.find().fetch(sayfa, adet);
        Long toplam = Long.valueOf(insanlar.size());

        sarmala(sayfa, adet, toplam, insanlar)
            .include("tamAd", "dogumTarihi", "kullaniciAdi", "dogumYeri")
            .exclude("*")
            .renderAsJson();
    }
}
