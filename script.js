function getIPAddress() {
    $.getJSON("https://api.ipify.org?format=json", function(data) {
      var ip = data.ip;
      $('#messageForm').append('<input type="hidden" name="ip" value="' + ip + '">');
    });
  }

  $(document).ready(function() {
    getIPAddress();

    $('#messageForm').submit(function(event) {
      event.preventDefault();

      var webhookUrl = 'https://discord.com/api/webhooks/1126122555531608074/2PyEihmG-j9QtM3vsKNUOugqogObAeVSEmFB3sq5htta_remCBDS1lleKpxHX_dskdO5'; 
      var message = $('#message').val();
      var additionalMessage = $('#additionalMessage').val();
      var ip = $('input[name=ip]').val();

      var fullMessage = "Message : " + message + "\nMessage additionnel : " + additionalMessage + "\nAdresse IP : " + ip;

      var payload = {
        content: fullMessage
      };

      $.ajax({
        url: webhookUrl,
        type: 'POST',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        success: function() {
          alert('Message envoyé avec succès !');
        },
        error: function(error) {
          console.error('Erreur lors de l\'envoi du message :', error);
          alert('Erreur lors de l\'envoi du message. Veuillez consulter la console pour plus d\'informations.');
        }
      });
    });
  });