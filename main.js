$(document).ready(function() {
    function encode(r){return r.replace(/[\x26\x0A\<>'"]/g,function(r){return"&#"+r.charCodeAt(0)+";"})}

    $.getJSON("/api", function(data) {
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-user"></i></div><div class="col-6">Public Players</div><div class="col-4 text-right">' + data.public_players_count + '</div></div>');
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-user-secret"></i></div><div class="col-6">Private Players</div><div class="col-4 text-right">' + data.private_players_count + '</div></div>');
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-users"></i></div><div class="col-6">Total Players</div><div class="col-4 text-right">' + data.total_players_count + '</div></div>');
        $(".main-stats").append('<div class="row row-space"></div>');
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-gamepad"></i></div><div class="col-6">Public Games</div><div class="col-4 text-right">' + data.public_games_count + '</div></div>');
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-lock"></i></div><div class="col-6">Private Games</div><div class="col-4 text-right">' + data.private_games_count + '</div></div>');
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-layer-group"></i></div><div class="col-6">Total Games</div><div class="col-4 text-right">' + data.total_games_count + '</div></div>');
        $(".main-stats").append('<div class="row row-space"></div>');
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-people-arrows"></i></div><div class="col-6">In Connection</div><div class="col-4 text-right">' + data.in_progress_count + '</div></div>');
        $(".main-stats").append('<div class="row"><div class="col-1"><i class="fas fa-server"></i></div><div class="col-6">On Proxy Server</div><div class="col-4 text-right">' + data.master_proxy_count + '</div></div>');
    });

    $.getJSON("/api/public_games", function(data) {
        $.each(data, function() {
            $(".games-table").append('<tr><th><i class="fas fa-gamepad"></i> ' + this.game_name + '<br /><span class="titleid">(' + this.title_id + ')</span></th><td>' + this.player_count + '/' + this.max_player_count + ' <i class="fas fa-users"></i><br /><i class="fas fa-home"></i> ' + encode(this.players.join(', <i class="fas fa-user"></i> ')) + '</td><td><i class="fas fa-network-wired"></i> ' + this.mode + ' (' + this.status + ')</td></tr>');
        });
    });
});