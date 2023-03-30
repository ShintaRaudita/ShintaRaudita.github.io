function PushButton(){
  nama1=document.getElementById("nama1").value;
  nama2=document.getElementById("nama2").value;
  email=document.getElementById("email").value;
  password=document.getElementById("password").value;
  negara=document.getElementById("negara").value;
  PostSignUp(nama1,nama2,email,password,negara);
}

function PostSignUp(nama1,nama2,email,password,negara){
  var myHeaders = new Headers();
  myHeaders.append("Login", "bismillah2");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "nama1": nama1,
    "nama2": nama2,
    "email": email,
    "password": password,
    "negara": negara
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("https://eoy9c6odr9n3arx.m.pipedream.net?Login=bismillah2", requestOptions)
  .then(response => response.text())
  .then(result => GetResponse(result))
  .catch(error => console.log('error', error));
}

function GetResponse(result){
  document.getElementById("formsignup").innerHTML = result;

  console.log(result)
}