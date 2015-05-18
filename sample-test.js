'use strict';
var RaptorRunner = require('gaia-marionette-raptor');
marionette('LockScreen media playback tests', function() {
  var LockScreenMediaPlaybackActions, actions;
  var LockScreenMediaPlaybackChecks, checks;
  var FakeMusic = require('./lib/media_playback_fake_music.js');
  var fakeMusicInfo = new FakeMusic();
  var apps = {};
  apps[fakeMusicInfo.origin] = fakeMusicInfo.path;
  var client = marionette.client({
    prefs: {
      // This is true on Gonk, but false on desktop, so override.
      'dom.inter-app-communication-api.enabled': true
    },
    apps: apps
  });

  setup(function() {
    LockScreenMediaPlaybackActions =
      require('./lib/lockscreen_media_playback_actions.js');
    LockScreenMediaPlaybackChecks =
      require('./lib/lockscreen_media_playback_checks.js');
    actions = (new LockScreenMediaPlaybackActions()).start(client);
    checks = (new LockScreenMediaPlaybackChecks()).start(client);
  });

  test('should show now playing info', function(mdone) {
    RaptorRunner.capture(function(detach) {
      actions
        .unlockScreen()
        .openMusicApp()
        .playAlbumOne()
        .lockScreen();
      mdone();
      detach();
    }, 'osLogoEnd');
  }); // --- test
});


