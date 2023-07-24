import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = (props) => {
	return (
		<Paper>
			<Navbar />
			<Outlet />
		</Paper>
	);
};

export default Layout;
