// ==============================|| USER PROFILE - BASIC ||============================== //

import ListItemIcon from '@mui/material/ListItemIcon';
import { CardCoin, Profile } from 'iconsax-react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { GiTeamIdea } from 'react-icons/gi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import List from '@mui/material/List';

export default function CustomerLeftTab({ setValue, value }) {

  const handleListItemClick = (index, route) => {
    setValue(index);
  };


  return (
    <>
      <ListItemButton selected={value === 0} onClick={() => handleListItemClick(0)}>
        <ListItemIcon>
          <Profile size={18} />
        </ListItemIcon>
        <ListItemText primary="Passport" />
      </ListItemButton>
      <ListItemButton selected={value === 1} onClick={() => handleListItemClick(1)}>
        <ListItemIcon>
          <CardCoin size={18} />
        </ListItemIcon>
        <ListItemText primary="Karta qo'shish" />
      </ListItemButton>
      <ListItemButton selected={value === 2} onClick={() => handleListItemClick(2)}>
        <ListItemIcon>
          <GiTeamIdea size={18} />
        </ListItemIcon>
        <ListItemText primary="Kontaktlar" />
      </ListItemButton>
      {/*<ListItemButton selected={value === 3} onClick={() => handleListItemClick(3)}>*/}
      {/*  <ListItemIcon>*/}
      {/*    <MdOutlinePrivacyTip size={18} />*/}
      {/*  </ListItemIcon>*/}
      {/*  <ListItemText primary="Shaxsiy ma'lumotlar" />*/}
      {/*</ListItemButton>*/}

      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: 'secondary.main' } }}>
      </List>

    </>

  )
    ;
}
