import React, { Component, PropTypes } from 'react'
import DOM from 'react-dom'

export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props)
    
    this.state = { animValues: 0 }
    this.onScrollStart = this.onScrollStart.bind(this)
  }
    
  onScrollStart(e) {
    e.preventDefault()
    var rawData = e.deltaY ? e.deltaY : e.deltaX
    var mouseY = Math.floor(rawData)

    // // Bring in the existing animation values
    var newAnimationValue = mouseY
    var newAnimationValueNegative = -mouseY

    let deltaMotion = 0;
    
    if(this.props.reverseScroll) {
      deltaMotion = newAnimationValueNegative;
    } else {
      deltaMotion = newAnimationValue;
    }
    
    DOM.findDOMNode(this).scrollLeft += deltaMotion;
  }

  render() {
    const scrollingElementStyles = {
                display: `inline-flex`,
                height: `100%`,
                position: `absolute`,
                willChange:`transform` }
      
    const { config, style } = this.props
    const { width, height, overflow } = style 
    const springConfig = config ? config : presets.noWobble

    // Styles
    const styles = {
      height: height ? height : `100%`,
      width: width ? width : `100%`,
      overflow: overflow ? overflow : 'hidden',
      position: `relative`,
      ...styles
    }

    return (
      <div onWheel={this.onScrollStart} 
      ref='hScrollParent' 
      style={ styles } 
      className='scroll-horizontal' >
        <div style={ scrollingElementStyles }>
          { this.props.children }
        </div>
      </div>
    )
  }
}

HorizontalScroll.proptypes = {
  reverseScroll: PropTypes.bool,
  pageLock: PropTypes.bool,
  config: PropTypes.object,
  style: PropTypes.object
}

HorizontalScroll.defaultProps = {
  reverseScroll: true,
  pageLock: false,
  config: null,
  style: { width: `100%`, height: `100%`, overflow: 'hidden' }
}
