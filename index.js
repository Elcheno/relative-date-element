const _SECONDS_ = 1000 - 100;
const _MINUTES_ = (_SECONDS_ * 60) - _SECONDS_;
const _HOURS_ = (_MINUTES_ * 60) - _MINUTES_;
const _DAYS_ = (_HOURS_ * 24) - _HOURS_;
const _WEEKS_ = (_DAYS_ * 7) - _DAYS_;
const _TIME_VALUES = {
  _MILISECONDS_: 1000,
  _SECONDS_: 60,
  _MINUTES_: 60,
  _HOURS_: 24,
  _DAY_: 7,
}

class RelativeDateElement extends HTMLElement {

  static observedAttributes = ["date", "loop", "lang"];
  static _lang = null;

  async _loadTranslations(lang) {
    return await fetch(`lang/${lang}.json`).then(
      res => res.json()
    ).then(
      json => json
    );
  }

  _formatString(template, values) {
    return template.replace(/{(\w+)}/g, (match, key) => values[key] || '');
  }

  _getTranslation(key, value) {
    const singularKey = key.slice(0, -1);
    return value === 1 ? this._lang[singularKey] : this._lang[key];
  }

  _getSeconds(value) {
    return Math.round(value / _TIME_VALUES._MILISECONDS_);
  }

  _getMinutes(value) {
    return Math.round(value / _TIME_VALUES._MILISECONDS_ / _TIME_VALUES._SECONDS_);
  }

  _getHours(value) {
    return Math.round(value / _TIME_VALUES._MILISECONDS_ / _TIME_VALUES._SECONDS_ / _TIME_VALUES._MINUTES_);
  }

  _getDays(value) {
    return Math.round(value / _TIME_VALUES._MILISECONDS_ / _TIME_VALUES._SECONDS_ / _TIME_VALUES._MINUTES_ / _TIME_VALUES._HOURS_);
  }

  _getWeeks(value) {
    return Math.round(value / _TIME_VALUES._MILISECONDS_ / _TIME_VALUES._SECONDS_ / _TIME_VALUES._MINUTES_ / _TIME_VALUES._HOURS_ / _TIME_VALUES._DAY_);
  }

  _isNow() {
    return this._formatString(this._lang.now, {});
  }

  _afterSeconds(date) {
    let seconds = this._getSeconds(date);
    let template = null;
    if (seconds > 0) {
      template = this._getTranslation('seconds', seconds);
    } else {
      seconds = seconds * (-1);
      template = this._getTranslation('afterSeconds', seconds);
    }
    return this._formatString(template, { value: seconds });
  }

  _afterMinutes(date) {
    let minutes = this._getMinutes(date);
    let template = null;
    if (minutes > 0) {
      template = this._getTranslation('minutes', minutes);
    } else {
      minutes = minutes * (-1);
      template = this._getTranslation('afterMinutes', minutes);
    }
    return this._formatString(template, { value: minutes });
  }

  _afterHours(date) {
    let hours = this._getHours(date);
    let template = null;
    if (hours > 0) {
      template = this._getTranslation('hours', hours);
    } else {
      hours = hours * (-1);
      template = this._getTranslation('afterHours', hours);
    }
    return this._formatString(template, { value: hours });
  }

  _afterDays(date) {
    let days = this._getDays(date);
    let template = null;
    if (days > 0) {
      template = this._getTranslation('days', days);
    } else {
      days = days * (-1);
      template = this._getTranslation('afterDays', days);
    }
    return this._formatString(template, { value: days });
  }

  _afterWeeks(date) {
    let weeks = this._getWeeks(date);
    let template = null;
    if (weeks > 0) {
      template = this._getTranslation('weeks', weeks);
    } else {
      weeks = weeks * (-1);
      template = this._getTranslation('afterWeeks', weeks);
    }
    return this._formatString(template, { value: weeks });
  }

  _handlerDate(data) {
    if (!this._lang) return '';

    const date = new Date(data);
    const value_date = new Date() - date;

    if (value_date < 0) {
      if (value_date > -_SECONDS_) {
        console.log('flag');
        return this._isNow(value_date);
      } else if (value_date > -_MINUTES_) {
        return this._afterSeconds(value_date);
      } else if (value_date > -_HOURS_) {
        return this._afterMinutes(value_date);
      } else if (value_date > -_DAYS_) {
        return this._afterHours(value_date);
      } else if (value_date > -_WEEKS_) {
        return this._afterDays(value_date);
      } else {
        return this._afterWeeks(value_date);
      }
    } else {
      if (value_date < _SECONDS_) {
        return this._isNow(value_date);
      } else if (value_date < _MINUTES_) {
        return this._afterSeconds(value_date);
      } else if (value_date < _HOURS_) {
        return this._afterMinutes(value_date);
      } else if (value_date < _DAYS_) {
        return this._afterHours(value_date);
      } else if (value_date < _WEEKS_) {
        return this._afterDays(value_date);
      } else {
        return this._afterWeeks(value_date);
      }
    }
  }

  _setValueDate() {
    const att_date = this.getAttribute('date');
    const loop = this.getAttributeNames().includes('loop');

    if (loop) {
      setInterval(() => {
        const result = this._handlerDate(att_date);
        this.innerHTML = result;
      }, 1e3);
    }

    const result = this._handlerDate(att_date);
    this.innerHTML = result;
  }

  async connectedCallback() {
    const lang = this.getAttribute('lang') ?? 'en';
    this._lang = await this._loadTranslations(lang);

    this._setValueDate();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'lang') {
      const lang = this.getAttribute('lang') ?? 'en';
      this._lang = await this._loadTranslations(lang);
      this._setValueDate();
    } else if (name === 'date') {
      const result = this._handlerDate(newValue);
      this.innerHTML = result;
    }
  }
}

customElements.define('relative-date-element', RelativeDateElement);
