import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT PROFILE - SETTINGS ||============================== //

export default function TabSettings() {
  const [checked, setChecked] = useState(['en', 'email-1', 'email-3', 'credit-1', 'credit-3']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Email Settings">
              <Stack spacing={2.5}>
                <Typography variant="subtitle1">Setup Email Notification</Typography>
                <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                  <ListItem>
                    <ListItemText id="switch-list-label-en" primary={<Typography color="secondary">Email Notification</Typography>} />
                    <Switch
                      edge="end"
                      onChange={handleToggle('en')}
                      checked={checked.indexOf('en') !== -1}
                      inputProps={{ 'aria-labelledby': 'switch-list-label-en' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-sctp"
                      primary={<Typography color="secondary">Send Copy To Personal Email</Typography>}
                    />
                    <Switch
                      edge="end"
                      onChange={handleToggle('sctp')}
                      checked={checked.indexOf('sctp') !== -1}
                      inputProps={{ 'aria-labelledby': 'switch-list-label-sctp' }}
                    />
                  </ListItem>
                </List>
              </Stack>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Updates from System Notification">
              <Stack spacing={2.5}>
                <Typography variant="subtitle1">Email you with?</Typography>
                <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">News about PCT-themes products and feature updates</Typography>} />
                    <Checkbox defaultChecked />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">Tips on getting more out of PCT-themes</Typography>} />
                    <Checkbox defaultChecked />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={<Typography color="secondary">Things you missed since you last logged into PCT-themes</Typography>}
                    />
                    <Checkbox />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">News about products and other services</Typography>} />
                    <Checkbox />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">Tips and Document business products</Typography>} />
                    <Checkbox />
                  </ListItem>
                </List>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard title="Activity Related Emails">
          <Stack spacing={2.5}>
            <Typography variant="subtitle1">When to email?</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText id="switch-list-label-email-1" primary={<Typography color="secondary">Have new notifications</Typography>} />
                <Switch
                  edge="end"
                  onChange={handleToggle('email-1')}
                  checked={checked.indexOf('email-1') !== -1}
                  inputProps={{ 'aria-labelledby': 'switch-list-label-email-1' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-email-2"
                  primary={<Typography color="secondary">You&apos;re sent a direct message</Typography>}
                />
                <Switch
                  edge="end"
                  onChange={handleToggle('email-2')}
                  checked={checked.indexOf('email-2') !== -1}
                  inputProps={{ 'aria-labelledby': 'switch-list-label-email-2' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-email-3"
                  primary={<Typography color="secondary">Someone adds you as a connection</Typography>}
                />
                <Switch
                  edge="end"
                  onChange={handleToggle('email-3')}
                  checked={checked.indexOf('email-3') !== -1}
                  inputProps={{ 'aria-labelledby': 'switch-list-label-email-3' }}
                />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="subtitle1">When to escalate emails?</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText id="switch-list-label-order-1" primary={<Typography color="secondary.400">Upon new order</Typography>} />
                <Switch
                  edge="end"
                  onChange={handleToggle('credit-1')}
                  checked={checked.indexOf('credit-1') !== -1}
                  disabled
                  inputProps={{ 'aria-labelledby': 'switch-list-label-credit-1' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-order-2"
                  primary={<Typography color="secondary.400">New membership approval</Typography>}
                />
                <Switch
                  edge="end"
                  disabled
                  onChange={handleToggle('credit-2')}
                  checked={checked.indexOf('credit-2') !== -1}
                  inputProps={{ 'aria-labelledby': 'switch-list-label-credit-2' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText id="switch-list-label-order-3" primary={<Typography color="secondary">Member registration</Typography>} />
                <Switch
                  edge="end"
                  onChange={handleToggle('credit-3')}
                  checked={checked.indexOf('credit-3') !== -1}
                  inputProps={{ 'aria-labelledby': 'switch-list-label-credit-3' }}
                />
              </ListItem>
            </List>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained">Update Profile</Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
