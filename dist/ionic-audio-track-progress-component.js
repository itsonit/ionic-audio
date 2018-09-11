import { Component, Input, Output, EventEmitter } from "@angular/core";
/**
 * # ```<audio-track-progress>```
 *
 * Renders a timer component displaying track progress and duration
 *
 * ## Usage
 * ````
 * <audio-track-progress [audioTrack]="track"></audio-track-progress>
 * ````
 *
 * @element audio-track-progress
 * @parents audio-track
 * @export
 * @class AudioTrackProgressComponent
 */
var AudioTrackProgressComponent = (function () {
    function AudioTrackProgressComponent() {
    }
    AudioTrackProgressComponent.decorators = [
        { type: Component, args: [{
                    selector: "audio-track-progress",
                    template: '<em *ngIf="audioTrack.duration > 0">{{audioTrack.progress | audioTime}} / </em><em>{{audioTrack.duration | audioTime}}</em>'
                },] },
    ];
    /** @nocollapse */
    AudioTrackProgressComponent.ctorParameters = function () { return []; };
    AudioTrackProgressComponent.propDecorators = {
        "audioTrack": [{ type: Input },],
    };
    return AudioTrackProgressComponent;
}());
export { AudioTrackProgressComponent };
/**
 * # ```<audio-track-progress-bar>```
 *
 * Renders a progress bar with optional timer, duration and progress indicator
 *
 * ## Usage
 * ````
 *  <audio-track-progress-bar duration progress [audioTrack]="audio"></audio-track-progress-bar>
 * ````
 *
 * @element audio-track-progress-bar
 * @parents audio-track
 * @export
 * @class AudioTrackProgressBarComponent
 */
var AudioTrackProgressBarComponent = (function () {
    function AudioTrackProgressBarComponent() {
        this.onFinish = new EventEmitter();
    }
    Object.defineProperty(AudioTrackProgressBarComponent.prototype, "progress", {
        get: function () {
            return this._showProgress;
        },
        set: /**
           * Input property indicating whether to display track progress
           *
           * @property @Input() progress
           * @type {boolean}
           */
        function (value) {
            this._showProgress = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackProgressBarComponent.prototype, "duration", {
        get: function () {
            return this._showDuration;
        },
        set: /**
           * Input property indicating whether to display track duration
           *
           * @property @Input() duration
           * @type {boolean}
           */
        function (value) {
            this._showDuration = true;
        },
        enumerable: true,
        configurable: true
    });
    AudioTrackProgressBarComponent.prototype.seekTo = function (value) {
        if (!Number.isNaN(value))
            this.audioTrack.seekTo(value);
    };
    AudioTrackProgressBarComponent.prototype.touchstart = function (event) {
        if (this.audioTrack) {
            this.audioTrack.pause();
        }
    };
    AudioTrackProgressBarComponent.prototype.touchend = function (event) {
        if (this.audioTrack && !this.audioTrack.isPlaying) {
            this.audioTrack.play();
        }
    };
    AudioTrackProgressBarComponent.prototype.ngOnChanges = function (changes) {
        if (changes.audioTrack.firstChange)
            return;
        // stop old track just in case
        var oldTrack = changes.audioTrack.previousValue;
        if (oldTrack && typeof oldTrack.stop === "function") {
            oldTrack.stop();
        }
    };
    AudioTrackProgressBarComponent.prototype.ngDoCheck = function () {
        if (this.audioTrack && this.audioTrack.isFinished) {
            this.onFinish.emit(this.audioTrack);
        }
    };
    AudioTrackProgressBarComponent.decorators = [
        { type: Component, args: [{
                    selector: "audio-track-progress-bar",
                    template: "\n    <time *ngIf=\"_showProgress\"><span *ngIf=\"audioTrack\" [style.opacity]=\"audioTrack.duration > 0 ? 1 : 0\">{{audioTrack.progress | audioTime}}</span></time>\n    <div class=\"progress-outer\">\n      <div class=\"progress-inner\" [style.width]=\"audioTrack ? audioTrack.progress : 0 + '%'\">\n        <input type=\"range\" #seeker min=\"0\" [max]=\"audioTrack ? audioTrack.duration : 0\" step=\"any\" [value]=\"audioTrack ? audioTrack.progress : 0\" (change)=\"seekTo(seeker.value)\" (touchstart)=\"touchstart($event)\" (touchend)=\"touchend($event)\">\n      </div>\n    </div>\n    <time *ngIf=\"_showDuration\"><span *ngIf=\"audioTrack\" [style.opacity]=\"audioTrack.duration > 0 ? 1 : 0\">{{audioTrack.duration | audioTime}}</span></time>\n    "
                },] },
    ];
    /** @nocollapse */
    AudioTrackProgressBarComponent.ctorParameters = function () { return []; };
    AudioTrackProgressBarComponent.propDecorators = {
        "audioTrack": [{ type: Input },],
        "onFinish": [{ type: Output },],
        "progress": [{ type: Input },],
        "duration": [{ type: Input },],
    };
    return AudioTrackProgressBarComponent;
}());
export { AudioTrackProgressBarComponent };
//# sourceMappingURL=ionic-audio-track-progress-component.js.map