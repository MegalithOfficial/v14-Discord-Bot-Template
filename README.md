# v14-Altpayı
Türkiyede ilk V14 altyapı
Megalith sunar.

# Kurulum

1. Projeyi clonelayın ve CMD açıp `npm i` yazın.
2. `config.js` içindeki yerleri doldurun.
3. Aynı CMD üzerinden `node .` yazın ve Botunuz aktif.

# SSS:
## Main niye bukadar kısa! ben client.on kodlarımı nereye koyacağım!?
client.on olan komutlarınızı events adlı klasörde hangi eventi kullanıyorsa `eventadı.js` şekinde dosya oluşturup yapabilirsiniz.
Örnek event dosyası örnekler klasöründe mevcut.

## botta Slash komutlar gözükmüyor!
Bunun birkaç nedeni olabilir. 
1. en sık olan neden: bot doğru scopelar olmadan sunucuya eklenmesi. Çözümü basit, davet oluştururken bu SCOPES kısmını bu şekilde seçmeniz gerek.
2. en sık görülen hata: appId kısmındaki Id botunuzun Client Idsini girmeniz gerek, eğer girdiyseniz doğru olup olmadığını kontrol edin.
3. Eğer HandlerMode Guild diye ayarlıysa guildId kısmındaki Idnin doğru olduğundan emin olun.
