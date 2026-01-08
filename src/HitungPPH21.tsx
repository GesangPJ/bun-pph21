import { useRef, type FormEvent } from "react";

export function HitungPPH21(){
    const hasil_hitung = useRef<HTMLTextAreaElement>(null)

    const hitungpph21 = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try{
      const form = e.currentTarget
      const formData = new FormData(form)

      //ambil nilai gaji
      const gajiStr = formData.get("gajinet") as string
      //ambil pilihan user
      const pilihanStr = formData.get("pilihan") as string

      //ubah ke int
      const gaji = parseInt(gajiStr.replace(/\D/g, ""),10) || 0
      const pilihan_ptkp = parseInt(pilihanStr, 10) || 1

      //nilai array sesuai urutan Kategori (TK0...K3)
      const arrayPTKP = [54000000,58500000,63000000,67500000,58500000,63000000,67500000,72000000];

      //ambil nilai ptkp berdasarkan pilihan user
      const ptkp = arrayPTKP[pilihan_ptkp-1] ?? 0

      //hitung nilai pkp
      let pkp: number

      //jika gaji dibawah ptkp maka 0
      if ( gaji < ptkp){
        pkp = 0
      }
      else {
        pkp = Math.max(0, gaji - ptkp)

      }

      //hitung Pph21
      const hasil_pph21 = (pkp: number): number =>{
        if (pkp <= 60000000){
            return pkp * 0.05
        }
        else if (pkp <= 250000000){
            return pkp * 0.15
        }
        else if (pkp <= 500000000){
            return pkp * 0.25
        }
        else if (pkp <= 5000000000){
            return pkp * 0.30
        }
        else{
            return pkp * 0.35
        }
      }

      //pembulatan hasil
      const nilaipajak = Math.round(hasil_pph21(pkp))
      
      let hasilStr: string

      //output
      if(nilaipajak===0){
        // output jika 0
        hasilStr="PKP anda bernilai `0` anda tidak memiliki kewajiban Pph21."

      }
      else{
        //output jika tidak 0 dan ubah ke format IDR
        hasilStr = `Estimasi Pph21 Tahunan anda adalah Rp${nilaipajak.toLocaleString("id-ID")}`

      }

      if (hasil_hitung.current) {
        hasil_hitung.current.value = hasilStr
      }
                    
    }
    catch(error){
        console.error("Error hitung PPh21:", error)
      if (hasil_hitung.current) {
        hasil_hitung.current.value = "Terjadi Error..."
      }
    }
  };

  return(
    <div className="hitung-pph21">
      <form onSubmit={hitungpph21} className="endpoint-row">
        <select name="pilihan" className="method">
          <option value="1">(TK0) Tidak Menikah Tanggungan 0</option>
          <option value="2">(TK1) Tidak Menikah Tanggungan 1</option>
          <option value="3">(TK2) Tidak Menikah Tanggungan 2</option>
          <option value="4">(TK3) Tidak Menikah Tanggungan 3</option>
          <option value="5">(K0) Menikah Tanggungan 0</option>
          <option value="6">(K1) Menikah Tanggungan 1</option>
          <option value="7">(K2) Menikah Tanggungan 2</option>
          <option value="8">(K3) Menikah Tanggungan 3</option>
        </select>
        <input type="text" 
        name="gajinet" 
        defaultValue="" 
        className="url-input" 
        placeholder="Masukkan Gaji Nett Tahunan anda" />
        <button type="submit" className="send-button">
          Hitung
        </button>
      </form>
      <div>
        &nbsp;
      </div>
      <textarea ref={hasil_hitung} 
      readOnly placeholder="Estimasi Pph21 tahunan anda adalah Rp.-" 
      className="response-area"
      style={{ fontSize: '18px', lineHeight: '1.5', fontWeight: 500 }}
      />
    </div>

  );


}