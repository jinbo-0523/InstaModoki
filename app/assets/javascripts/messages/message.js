$(function(){
  function buildHTML(message){
    if( message.image ){
      let html =
        `<div class="Message-box" data-message-id=${message.id}>
          <div class="Message-box__message-info">
            <div class="Message-box__message-info__name">
              ${message.user_name}
            </div>
            <div class="Message-box__message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message-box__message">
            <p class="Message-box__message__content">
              ${message.content}
            </p>
            <img class="Message-box__message__image" src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="Message-box" data-message-id=${message.id}>
          <div class="Message-box__message-info">
            <div class="Message-box__message-info__name">
              ${message.user_name}
            </div>
            <div class="Message-box__message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message-box__message">
            <p class="Message-box__message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.New-message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.Chat-main__message-list').append(html);
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('.New-message')[0].reset();
      $('.New-message__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
