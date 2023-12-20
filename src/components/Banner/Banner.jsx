import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../public/svg/logo-no-background.svg"
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function ButtonAppBar() {
  const navigate = useNavigate()
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, backgroundColor:theme.palette.background.main, }}>
      <Button onClick={()=>{navigate('/')}}>
        <img
          src={logo}
          alt="Description of the image"
          width="100%"
          height="50rem"
        />
      </Button>
    </Box>
  );
}
