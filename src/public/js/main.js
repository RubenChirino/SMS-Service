const socket = io()

Notification.requestPermission().then(function(result) {
    console.log(result);
  });

function notifyMe(message = 'Hi there!') {

    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
      var notification = new Notification(message);
    }

    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          var notification = new Notification(message);
        }
      });
    }
  }

socket.on('new message', data => {
    console.log(data);

    notifyMe('New SMS received');

    const messagesList = document.getElementById('messages');

    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-item-warning list-group-item-action';

    const body = document.createElement('p');
    body.appendChild(document.createTextNode(data.body));

    const from = document.createElement('span');
    from.appendChild(document.createTextNode(data.from));

    const country = document.createElement('span');
    country.appendChild(document.createTextNode(data.FromCountry));

    const time = document.createElement('span');
    time.appendChild(document.createTextNode(timeago.format(data.createdAt)));

    li.appendChild(body);
    li.appendChild(from);
    li.appendChild(country);
    li.appendChild(time);
    messagesList.prepend(li);
})