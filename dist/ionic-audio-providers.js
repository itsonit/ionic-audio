var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { WebAudioTrack } from './ionic-audio-web-track';
import { CordovaAudioTrack } from './ionic-audio-cordova-track';
/**
 * Creates an audio provider based on the environment.
 * If running from within a browser, then defaults to HTML5 Audio. If running on a device, it will check for Cordova and Media plugins and use
 * a native audio player, otherwise falls back to HTML5 audio.
 *
 * @method factory
 * @static
 * @return {IAudioProvider} An IAudioProvider instance
 */
export function defaultAudioProviderFactory() {
    return window.hasOwnProperty('cordova') && window.hasOwnProperty('Media') ? new CordovaMediaProvider() : new WebAudioProvider();
}
/**
 * Base class for audio providers
 *
 * @export
 * @abstract
 * @class AudioProvider
 * @implements {IAudioProvider}
 */
var AudioProvider = (function () {
    function AudioProvider() {
    }
    /**
     * Creates an IAudioTrack instance from a JSON object.
     * Not implemented in base class.
     *
     * @method create
     * @param {ITrackConstraint} track A JSON object containing at least a src property
     * @return null
     */
    /**
       * Creates an IAudioTrack instance from a JSON object.
       * Not implemented in base class.
       *
       * @method create
       * @param {ITrackConstraint} track A JSON object containing at least a src property
       * @return null
       */
    AudioProvider.prototype.create = /**
       * Creates an IAudioTrack instance from a JSON object.
       * Not implemented in base class.
       *
       * @method create
       * @param {ITrackConstraint} track A JSON object containing at least a src property
       * @return null
       */
    function (track) {
        console.error('Not implemented in base class');
        return null;
    };
    /**
     * Replaces track with a new one
     * @param oldAudioTrack
     * @param newTrack
     */
    /**
       * Replaces track with a new one
       * @param oldAudioTrack
       * @param newTrack
       */
    AudioProvider.prototype.replace = /**
       * Replaces track with a new one
       * @param oldAudioTrack
       * @param newTrack
       */
    function (oldAudioTrack, newTrack) {
        console.error('Not implemented in base class');
        return null;
    };
    /**
     * Adds an existing IAudioTrack instance to the array of managed tracks.
     *
     * @method add
     * @param {IAudioTrack} audioTrack An instance of IAudioTrack
     */
    /**
       * Adds an existing IAudioTrack instance to the array of managed tracks.
       *
       * @method add
       * @param {IAudioTrack} audioTrack An instance of IAudioTrack
       */
    AudioProvider.prototype.add = /**
       * Adds an existing IAudioTrack instance to the array of managed tracks.
       *
       * @method add
       * @param {IAudioTrack} audioTrack An instance of IAudioTrack
       */
    function (audioTrack) {
        AudioProvider.tracks.push(audioTrack);
    };
    ;
    /**
     * Plays a given track.
     *
     * @method play
     * @param {number} index The track id
     */
    /**
       * Plays a given track.
       *
       * @method play
       * @param {number} index The track id
       */
    AudioProvider.prototype.play = /**
       * Plays a given track.
       *
       * @method play
       * @param {number} index The track id
       */
    function (index) {
        if (index === undefined || index > AudioProvider.tracks.length - 1)
            return;
        this._current = index;
        AudioProvider.tracks[index].play();
    };
    ;
    /**
     * Pauses a given track.
     *
     * @method pause
     * @param {number} [index] The track id, or if undefined it will pause whichever track currently playing
     */
    /**
       * Pauses a given track.
       *
       * @method pause
       * @param {number} [index] The track id, or if undefined it will pause whichever track currently playing
       */
    AudioProvider.prototype.pause = /**
       * Pauses a given track.
       *
       * @method pause
       * @param {number} [index] The track id, or if undefined it will pause whichever track currently playing
       */
    function (index) {
        if (this._current === undefined || index > AudioProvider.tracks.length - 1)
            return;
        index = index || this._current;
        AudioProvider.tracks[index].pause();
    };
    ;
    /**
     * Stops a given track.
     *
     * @method stop
     * @param {number} [index] The track id, or if undefined it will stop whichever track currently playing
     */
    /**
       * Stops a given track.
       *
       * @method stop
       * @param {number} [index] The track id, or if undefined it will stop whichever track currently playing
       */
    AudioProvider.prototype.stop = /**
       * Stops a given track.
       *
       * @method stop
       * @param {number} [index] The track id, or if undefined it will stop whichever track currently playing
       */
    function (index) {
        if (this._current === undefined || index > AudioProvider.tracks.length - 1)
            return;
        index = index || this._current;
        AudioProvider.tracks[index].stop();
        this._current = undefined;
    };
    ;
    /**
     * Reset all loaded file for working reintialisation of components.
     *
     * @see: https://github.com/arielfaur/ionic-audio/issues/185
     * @see: https://github.com/arielfaur/ionic-audio/issues/195
     *
     */
    /**
       * Reset all loaded file for working reintialisation of components.
       *
       * @see: https://github.com/arielfaur/ionic-audio/issues/185
       * @see: https://github.com/arielfaur/ionic-audio/issues/195
       *
       */
    AudioProvider.prototype.reset = /**
       * Reset all loaded file for working reintialisation of components.
       *
       * @see: https://github.com/arielfaur/ionic-audio/issues/185
       * @see: https://github.com/arielfaur/ionic-audio/issues/195
       *
       */
    function () {
        AudioProvider.tracks = [];
    };
    Object.defineProperty(AudioProvider.prototype, "tracks", {
        /**
         * Gets an array of tracks managed by this provider
         *
         * @property tracks
         * @readonly
         * @type {IAudioTrack[]}
         */
        get: /**
           * Gets an array of tracks managed by this provider
           *
           * @property tracks
           * @readonly
           * @type {IAudioTrack[]}
           */
        function () {
            return AudioProvider.tracks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioProvider.prototype, "current", {
        /**
         * Gets current track id
         *
         * @property current
         * @type {number}
         */
        get: /**
           * Gets current track id
           *
           * @property current
           * @type {number}
           */
        function () {
            return this._current;
        },
        /**
         * Sets current track id
         *
         * @property current
         */
        set: /**
           * Sets current track id
           *
           * @property current
           */
        function (v) {
            this._current = v;
        },
        enumerable: true,
        configurable: true
    });
    AudioProvider.tracks = [];
    AudioProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AudioProvider.ctorParameters = function () { return []; };
    return AudioProvider;
}());
export { AudioProvider };
/**
 * Creates an HTML5 audio provider
 *
 * @export
 * @class WebAudioProvider
 * @constructor
 * @extends {AudioProvider}
 */
var WebAudioProvider = (function (_super) {
    __extends(WebAudioProvider, _super);
    function WebAudioProvider() {
        var _this = _super.call(this) || this;
        console.log('Using Web Audio provider');
        return _this;
    }
    WebAudioProvider.prototype.create = function (track) {
        var audioTrack = new WebAudioTrack(track.src, track.preload);
        Object.assign(audioTrack, track);
        var trackId = WebAudioProvider.tracks.push(audioTrack);
        audioTrack.id = trackId - 1;
        return audioTrack;
    };
    WebAudioProvider.prototype.replace = function (oldAudioTrack, newTrack) {
        //WebAudioProvider.tracks.pop();
        var index = WebAudioProvider.tracks.findIndex(function (track) { return Object.is(oldAudioTrack, track); });
        var newAudioTrack = newTrack instanceof WebAudioTrack ? newTrack : new WebAudioTrack(newTrack.src, newTrack.preload);
        Object.assign(newAudioTrack, newTrack);
        if (index > -1) {
            WebAudioProvider.tracks.splice(index, 1, newAudioTrack);
        }
        else {
            var trackId = WebAudioProvider.tracks.push(newAudioTrack);
            newAudioTrack.id = trackId - 1;
        }
        console.log("Replaced audio track", oldAudioTrack, newAudioTrack);
        console.log("Current track list", WebAudioProvider.tracks);
        return newAudioTrack;
    };
    WebAudioProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebAudioProvider.ctorParameters = function () { return []; };
    return WebAudioProvider;
}(AudioProvider));
export { WebAudioProvider };
/**
 * Creates a Cordova audio provider
 *
 * @export
 * @class CordovaMediaProvider
 * @constructor
 * @extends {AudioProvider}
 */
var CordovaMediaProvider = (function (_super) {
    __extends(CordovaMediaProvider, _super);
    function CordovaMediaProvider() {
        var _this = _super.call(this) || this;
        console.log('Using Cordova Media provider');
        return _this;
    }
    CordovaMediaProvider.prototype.create = function (track) {
        var audioTrack = new CordovaAudioTrack(track.src);
        Object.assign(audioTrack, track);
        var trackId = CordovaMediaProvider.tracks.push(audioTrack);
        audioTrack.id = trackId - 1;
        return audioTrack;
    };
    CordovaMediaProvider.prototype.replace = function (oldTrack, newTrack) {
        return null;
    };
    CordovaMediaProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CordovaMediaProvider.ctorParameters = function () { return []; };
    return CordovaMediaProvider;
}(AudioProvider));
export { CordovaMediaProvider };
//# sourceMappingURL=ionic-audio-providers.js.map