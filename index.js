const express = require("express");
const app = express();

app.listen(3000, ()=>{
  console.log("Project is running!");
});



function normalize(msg){
  return msg.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
}

function isNotSubstring(msg, pattern){
  msg = normalize(msg);
  
var startPos = msg.indexOf(pattern);

  var endPos = startPos + (pattern.length-1);
  const onlyOneWord = (startPos == 0 && endPos == msg.length-1);
  const atStart = (startPos==0 && msg.charAt(endPos+1)===" ");
  const atEnd = (endPos==msg.length-1 && msg.charAt(startPos-1)===" ");

  const noAdjacentCharacters = (msg.charAt(startPos-1)===" " && msg.charAt(endPos+1)===" ");


return onlyOneWord || atStart || atEnd || noAdjacentCharacters;
}

function in_list(msg, arr){
  for (var i=0;i<arr.length;i++) {
  if(normalize(msg).includes(arr[i])){
    if(isNotSubstring(msg, arr[i])){
      return true;
}
     }
  }
  return false;
}


var who = ['siapa nama', 'siapa']
var what = ['apa', 'apa sih']

function generateQuestions(questionWord, str){
  var quest = [];
  
  for(var i=0;i<questionWord.length;i++){
    quest.push(questionWord[i]+' '+str+' kesukaanmu');
    quest.push(questionWord[i]+' '+str+" kesukaan kamu");
    quest.push(questionWord[i]+" "+str+" yang paling kamu suka");
    quest.push(questionWord[i]+" "+str+" yang kamu suka");
    quest.push(questionWord[i]+" "+str+" favoritmu");
  }
  return quest;
}

function generateResponses(questionWord, str, listOfAnswers, message){
  var response = [];
  console.log(questionWord===who)
  for(var i=0;i<listOfAnswers.length;i++){
    if(questionWord === who){
      response.push(`Aku sukanya sama ${listOfAnswers[i]}, ${message.author}.`);
      response.push(`Aku ngefans ${listOfAnswers[i]}. Kalau kamu gimana, ${message.author}?`);
      response.push(`Kalau aku sih sukanya sama si ${listOfAnswers[i]}. Btw siapa ${str} favoritmu?`);
    } else if(questionWord === what){
      response.push(`Aku sukanya ${str} ${listOfAnswers[i]}, ${message.author}.`);
      response.push(`Aku sih sukanya ${listOfAnswers[i]}. Kalau kamu sendiri gimana, ${message.author}? Apa ${str} kesukaanmu?`);
    } 
    response.push(listOfAnswers[i]);
  }
  return response;
}

function generateRandomResponses(message, questionList, responseList){
   if(in_list(message.content, questionList)){
    message.channel.send(responseList[Math.floor(Math.random()*responseList.length)]);
  }
}



app.get("/", (req,res)=>{
  res.send("Bot siap digunakan");
})

const Discord = require("discord.js");
const client = new Discord.Client({intents:["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"], disableEveryone: false});


client.on("messageCreate", message => {

  if(message.author.bot) return;
  if(normalize(message.content)==="assalamualaikum"){
    message.channel.send("Waalaikumsalam");
  }
  const sapa_islami = ["assalamualaikum wr wb", "assalamualaikum warahmatullahi wabarakatuh", "assalamualaikum warahmatullah wabarakatuh", "assalamualaikum warahmatullahi wabarakatu"];


  if(in_list(message.content,sapa_islami)){
    message.channel.send("Waalaikumsalam Warahmatullahi Wabarakatuh");
  }
  
  const sapa_yang_salah = ["ass", "samlekom", "samlekum", "asslm"];
  if(in_list(message.content,sapa_yang_salah)){
    message.channel.send("Waalaikumsalam, lain kali sapanya yang bener ya. Makasih.");
  }
  const sapa = ["halo", "hello", "hai", "hi"];
  const responseHello = [`Halo juga ${message.author}`,`Hai ${message.author}, apa kabar?`];
  generateRandomResponses(message, sapa, responseHello);

  //Menggunakan salam selamat pagi, siang, sore, malam
  let time = ['pagi', 'siang', 'sore', 'petang', 'malam'];
  
  for(let i=0;i<time.length;i++){
    var greetingList = ["selamat "+time[i],  "met "+time[i], time[i]];
    var choosen = [`Selamat ${time[i]}, ${message.author}. Semoga harimu menyenangkan ya`, 
                 `Semangat ${time[i]}`, 
                `Selamat ${time[i]}, tetap semangat ya ${message.author}.`, 
                `Selamat ${time[i]}, ${message.author}. Makasih udah mau nyapa dan jadi teman yang baik buat aku.`, `Selamat ${time[i]}, ${message.author}. Aku seneng deh jadi teman kamu.`];
    generateRandomResponses(message, greetingList, choosen);
  }

  var sudah = ['udah', 'sudah', 'udh', 'sdh'];

  const tanyaKabar = ["apa kabar", "gimana kabarnya", "apa kabarnya", "apa kabar semua", "gimana kabar", "bagaimana kabarnya"];

  const responseKabar = [
    "Alhamdulillah, baik. Kamu sendiri gimana?",
    "Alhamdulillah, luar biasa, Allahu Akbar",
    "Baik banget dong. Kamu sendiri gimana?",
    `Kabarku baik ${message.author}. Kamu sendiri gimana?`,
    "Aku baik-baik aja kok. Makasih kamu udah perhatian banget sama aku."
  ];

  generateRandomResponses(message, tanyaKabar, responseKabar);
  
  const ungkapanSyukur = ["alhamdulillah", "puji tuhan", "syukurlah", "wasyukurillah"];

  if(in_list(message.content, ungkapanSyukur)){
      message.channel.send("Alhamdulillah, aku juga ikut seneng dengernya.");
  }
  
//Menanyakan sudah makan atau sudah sholat
var makan = ['makan', 'mkn'];
var sholat = ['sholat', 'shalat', 'salat', 'solat'];

function generateNGramList (arr1, arr2){
  var combined = []
  for(var i=0;i<sudah.length;i++){
      for(var j=0;j<makan.length;j++){
        combined.push(arr1[i]+" "+arr2[j]);
        combined.push(arr2[j]+" "+arr1[i])
        }
  }
    return combined;
}

var responseSudahMakan = [`Aku belum makan, ${message.author}`, 
                          `Alhamdulillah, aku sudah makan.`,
`Udah kok, ${message.author}. Makasih ya udah perhatian sama aku.`,
`Astaghfirullah, aku lupa. Ini udah jam makan ya? Makasih udah ngingetin aku.`];

var responseSudahSholat = [
  `Astaghfirullah, makasih ya udah ngingetin aku.`,
  `Udah kok, ${message.author}. Makasih ya udah perhatian sama aku.`,
  `Sudah dong, ${message.author}. Kamu juga jangan lupa sholat ya kalau menjalankan.`, 
  `Alhamdulillah udah kok.`,
`Maaf ya, aku lagi ada halangan. Gak bisa sholat dulu.`,
  `Aku belum sholat nih, masih ada kerjaan. Kamu kalau mau sholat, sholat dulu aja.`,
  `Oiya belum`,
  `Bentar ya, habis ini langsung sholat kok.`
];




const nGramSudahMakan = generateNGramList(sudah, makan);
const nGramSudahSholat = generateNGramList(sudah, sholat);

generateRandomResponses(message, nGramSudahMakan, responseSudahMakan);
generateRandomResponses(message, nGramSudahSholat, responseSudahSholat);
          


  //Mengingatkan bot untuk sholat
var ingatkanSholat = [];
var reminder = ["jangan lupa", "ayo", "ayolah", "mari", "marilah", "jangan sampai lupa"];

for(var i=0;i<reminder.length;i++){
  {
     for(var j=0;j<sholat.length;j++){
       ingatkanSholat.push(reminder[i]+" "+sholat[j]);
     }
  }
}

var responseReminderSholat = [
  `Maaf ya, aku lagi ada halangan. Gak bisa sholat dulu.`,
  `Oke ${message.author}, kamu juga jangan lupa sholat ya kalau menjalankan.`,
  `Baik, ${message.author}. Makasih banyak ya udah ngingetin.`,
  `Udah tau!`,
  `Oke ${message.author}, makasih ya udah diingetin.`
];

generateRandomResponses(message, ingatkanSholat, responseReminderSholat);

  var tanyaArtis = generateQuestions(who, 'artis');
  var tanyaPenyanyi = generateQuestions(who, 'penyanyi');

  var listPenyanyi = ['Ceng Zamzam', 'JKT48', 'Khanifah Khani', 'Habib Ali Yahya Al Habsyi', 'Dewa 19', 'Ari Lasso', 'Melly Goeslaw', 'Anji', 'HiVi', 'Fiersa Besari',
                  'Pasha Ungu', 'Ungu', 'Sigit Purnomo', 'Maher Zain', 'Mesut Kurtis', 'Irwansyah', 'Acha Septriasa', 'Niki Zefanya', 'Rich Brian', 'Ayu Tingting', 'Ahmad Dhani', 'Maroon5', 'Whiz Khalifa', 'Habib Syech bin Abdul Qodir Assegaf', 'Noah', 'Project Pop', 'Once Mekel', 'Geisha', 'Five Minutes', 'Maudy Ayunda'];

  var listArtis = ['Deddy Corbuzier', 'Vicky Prasetyo', 'Syifa Fatimah', 'Citra Kirana', 'Atta Halilintar', 'Anang Hermansyah', 'Ashanty', 'Angel Lelga', 'Alshad Ahmad','Jessica Mila', 'Raffi Ahmad'];

  var listArtis = listArtis.concat(listPenyanyi)

  var responseArtis = generateResponses(who, 'artis', listArtis, message);
  var responsePenyanyi = generateResponses(who, 'penyanyi', listPenyanyi, message);

  var listMakanan = ['Nasi goreng', 'Nasi gudeg', 'Nasi hainam', 'Sate ayam', 'Seafood', 'Mie Goreng', 'Mie ayam', 'Bakso'];

  var tanyaMakanan = generateQuestions(what, 'makanan');

  var responseMakanan = generateResponses(what, 'makanan', listMakanan, message);

  generateRandomResponses(message, tanyaArtis, responseArtis);
  generateRandomResponses(message, tanyaPenyanyi, responsePenyanyi);
  generateRandomResponses(message, tanyaMakanan, responseMakanan);
});




client.on('guildMemberAdd', member => {
    const channels = member.guild.channels.cache.find(channel => channel.name === "landing-page");
    channels.send(`Halo, <@${member.id}>. Selamat datang di server **Kini Makin Asik**, server tercepat, termuda, dan terbaik yang pernah kamu temukan. Jangan lupa verifikasi, ambil role, dan baca rules ya. Terima kasih. Semoga betah di sini.`); 
});

client.on("guildMemberRemove", member => {
  const channels = member.guild.channels.cache.find(channel => channel.name === "landing-page");

  channels.send(`Selamat jalan, ${member.displayName}. Sampai bertemu kembali di lain kesempatan. Semoga harimu baik-baik saja.`);
});

function setReminder(h, m, s){
var d = new Date();
var utcTime = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(),
                d.getUTCDate(), d.getUTCHours()+7,
                d.getUTCMinutes(), d.getUTCSeconds());

    var dateUTC = new Date(utcTime);
  var timeGap = -utcTime + d.setUTCHours(h,m,s);
  //Set ke hari selanjutnya jika sudah lewat jamnya
  while(timeGap < 0) {
    timeGap = -utcTime + d.setUTCHours(24+h,m,s);
  }
    return timeGap;
}

function send_message(channels, message){
  channels.send(message);
}

var shubuhPrayerMessage = `Selamat pagi @everyone, jangan lupa sholat subuh ya bagi yang menjalankan.`;

var morningMessage = `Selamat pagi @everyone, semoga hari kalian menyenangkan ya.`;

var afternoonMessage = `Selamat siang @everyone, semoga kalian tetap semangat ya.`;

var maghribMessage = `Selamat sore @everyone, jangan lupa sholat maghrib ya bagi yang menjalankan.`;

var nightMessage = `Selamat malam @everyone, selamat istirahat. Jangan lupa tidur supaya besok kalian bisa menjalankan aktivitas dengan baik.`;


client.on('ready', () => {
    const channels = client.channels.cache.find(channel => channel.name === "ngobrol-asik");
  
  dailyMessage(channels, shubuhPrayerMessage, 04, 30, 00);
  dailyMessage(channels, morningMessage, 06, 30, 00);
  dailyMessage(channels, morningMessage, 08, 00, 00); 
  dailyMessage(channels, afternoonMessage, 12,00, 00);
  dailyMessage(channels, maghribMessage, 17,30, 00);
  dailyMessage(channels, nightMessage, 22, 00, 00);
  dailyMessage(channels, nightMessage, 00, 00, 00);
});
    
function dailyMessage(channels, message, h, m, s){
  var dayMiliSeconds = 1000*3600*24;
  
  setTimeout (() => {
     send_message(channels, message);
    
      setInterval(() => {
        send_message(channels, message);
      }, dayMiliSeconds)
    }, setReminder(h, m, s));
}



client.login(process.env.token);

//console.log("Trigerred")