import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const GradientButtonComponent = styled(Button)({
  background: 'linear-gradient(45deg, #007acc 0%, #46adc9 55%, #07eab1 90%)',
  borderRadius: 3
});

export default GradientButtonComponent;
