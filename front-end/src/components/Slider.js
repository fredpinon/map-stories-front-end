import React from 'react';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui-slider-label/Slider';
import { cyan500 } from 'material-ui/styles/colors';

const styles = {
  subheader: {
    textTransform: 'capitalize',
  },
  labelStyleOuter: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: cyan500,
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
  },
  labelStyleInner: {
    transform: 'rotate(45deg)',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '3px',
    right: '0px',
    fontSize: '10px',
  },
};

const SearchRadiusInput = ({ radius, onChange }) => (
  <div>
    <Subheader style={styles.subheader}>
      {'Search radius'}
    </Subheader>
    <Slider
      defaultValue={5 / 100}
      min={0}
      max={1}
      step={5 / 100}
      value={radius / 100}
      onChange={onChange}
      label={
        <div style={styles.labelStyleOuter}>
          <div style={styles.labelStyleInner}>
            {radius}
          </div>
        </div>
      }
    />
  </div>
);

export default SearchRadiusInput;
