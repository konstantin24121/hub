import React, { PureComponent, PropTypes } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import cn from 'classnames';

import s from './RaisedButton.css';
/* Анимации над элементом мы будем хранить в самом элементе ибо это логично. Он сам знает как себя вести. А вот как и когда ему себя вести
решает CSSTransitionGroup потому его анимаионные классы и импортятся в родителе 
Название переменной спорно, ибо в ней вссе классы от CustomRipple, но тк используюются только те что связанны с анимацией я посчитал такое название умесным
*/
import animations from './CustomRipple.css';

class RaisedButton extends PureComponent {
  static propTypes = {
    /**
    * Текст кнопки
     */
    label: PropTypes.string,
    /**
     * Обработчик нажатия кнопки
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    /* eslint-disable no-unused-vars */
    onClick: (event) => {},
    /* eslint-enable no-unused-vars */
  };

  constructor(props) {
    super(props);
    this.state = {
      isRipple: false,
      isClicked: true,
      isAnimate: false,
      /*
        NOTE: items не само удачно название, очень абстрактно
        такое допустимо когда речь идет о каком то контенте который 
        передается в пропсах, и может менятся, либо когда в названии компонента явно указывается что это коллекция чего-то.
        Например в случае ButtonGroup мы ясно даем понять что это группа кнопок, значит item использовать для передачи обьект параметров кнопок норм. Тут же item - это всегда коллеция рипплов, не совсем абстрактная штука, так и называй ripples. 
        ripplesArray тоже норм, но мне такое именование не нравится по причине что и так ясно что массив\коллекция. rippleCol тоже норм, но тут уже появляется правило именования, а чем их меньше тем лучше.
      */
      items: [], // items не само удачно название, очень абстрактно
      // NOTE: тоже самое что и замечение на 68строке
      d: 0,
      l: 0,
      t: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }


  /**
   * Handles
   */
  handleClick = (e) => {
    this.props.onClick(e);
  }

  handleMouseDown = (e) => {
    const mouseEvent = e.nativeEvent;
    const elementWidth = mouseEvent.target.clientWidth;
    const elementHeight = mouseEvent.target.clientHeight;

    // NOTE: Ты переуседствовал с именами переменных,
    // Понять что хранится в переменной с ходу сложно, не боись
    // юзать человекопонятные названия
    let _t = mouseEvent.offsetY;
    let _l = mouseEvent.offsetX;
    const box = {
      tl: {
        x: 0,
        y: 0,
      },
      tr: {
        x: elementWidth,
        y: 0,
      },
      br: {
        x: elementWidth,
        y: elementHeight,
      },
      bl: {
        x: 0,
        y: elementHeight,
      },
      c: {
        x: elementWidth / 2,
        y: elementHeight / 2,
      },
    };

    let corner = {};

    // BUG: тут что то не так считается, круги у левой стороны мелкие

    if (_l >= box.c.x) {
      if (_t >= box.c.y) {
        corner = box.tl;
      } else {
        corner = box.bl;
      }
    } else {
      if (_t >= box.c.y) {
        corner = box.tr;
      } else {
        corner = box.br;
      }
    }

    const _r = Math.round(Math.sqrt(Math.pow(corner.x - _l, 2) + Math.pow(corner.y - _t, 2)));

    const _d = _r * 2;
    _l -= _r;
    _t -= _r;
    // NOTE: Ты не переопределяешь массив ниже, let бессмысленно, 
    // тут явно const
    let newItems = this.state.items.slice();

    newItems.push({
      t: _t,
      l: _l,
      d: _d,
      stamp: Date.now(),
    });

    this.setState({
      isRipple: true,
      isClicked: false,
      isAnimate: true,
      items: newItems,
    });
  }

  handleMouseUp = (e) => {
    /*if (this.state.isAnimate) {
      this.setState({
        isClicked: true,
      });
    } else {
      this.setState({
        isClicked: true,
        isRipple: false,
      });
    }*/
  }

  handleRippleTransitionEnd = (e) => {
    console.log(e.nativeEvent.propertyName);
    if (this.state.isClicked) {
      this.setState({
        isAnimate: false,
        isRipple: false,
      });
    } else {
      this.setState({
        isAnimate: false,
      });
    }
  }

  handleRemove = (stamp) => {
    /*
      тут была твоя ошибка что ты удалял по индексу
      Но так делать не нужно, ибо после удаления элемента, ве индексы собьются. При работе с динамическим массивом используй только 
      то что изменится никак не может, к примеру тот же stamp который
      ты добавлял в обьект. 
      Ниже мы просто возвращаем в state items без того который надо удалить
    */
    this.setState((prevState) => {
      return {
        items: prevState.items.filter(o => o.stamp !== stamp)
      };
    });
  }

  /**
   * Renders
   */
  render() {
    const { label } = this.props;
    const rootCn = cn(s.root);
    const buttonCn = cn(s.button);
    const labelCn = cn(s.label);

    // NOTE: Для удобочитаемости лучше вынести это в отдельную
    // фунцию rendersRipples
    const items = this.state.items.map((item, i) => (
      <CustomRipple
        key={item.stamp}
        onTransitionEnd={this.handleRemove}
        t={item.t}
        l={item.l}
        d={item.d}
        index={i}
        stamp={item.stamp}
      />
    ));

    return (
      <div
        className={rootCn}
      >
        <button
          className={buttonCn}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          <div>
            {/* эта обертка зачем то была в customRipple, скорее всего потому что ты решил вынести нечно обосоленное в отдельный компонент и обертку тудаже, но на деле получилось что обертка создаласть для каждого элемента. Еще раз - не надо сразу старатся сделать универсальное что-то. Универсальность будешь заниматся когда появится два компонента, с таким риплом и вот тогда станет ясно что у них общее и что надо вынести в поведение. Ведь добавление рипло - тоже общее. Нахуя его дубоировать? Вот будешь этим потом заниматся, а пока вынес CustomRipple не и бог с ним, для уобства сгодитя, вот только надо его назвать с мелкой буквы, иначе его стайлгад как компонент уже считает, коим он полноценно не является, его нелья использовать в отрыве. Скорее вего он у нас уйдет в HOC но это уже другая история */}
            <div className={s.rippleArea}>
              {/*
                Тут ты допустил ошибку, не монтирую CSSTransitionGroup
                если нету риплов,
                https://github.com/reactjs/react-transition-group#animation-group-must-be-mounted-to-work
              */}
              <CSSTransitionGroup
                transitionEnterTimeout={1100}
                transitionLeave={false}
                transitionName={{
                  enter: animations.enter,
                  enterActive: animations.enter_isActive,
                }}
              >
                {items}
              </CSSTransitionGroup>
            </div>

            <div>
              <span className={labelCn}>{label}</span>
            </div>
          </div>
        </button>
      </div>
    );
  }
}

export default RaisedButton;
/**
 * version: 0.1.0
 */
