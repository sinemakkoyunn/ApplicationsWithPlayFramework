package models;


import play.modules.morphia.Model;

import com.google.code.morphia.annotations.Entity;

import java.util.Date;

@Entity
public class Insan extends Model{

public String kullaniciAdi;

    public String isim;
    public String soyisim;
    public String dogumYeri;
    public Date dogumTarihi;

    public String getTamAd(){
        return isim + " " + soyisim;
    }

}
