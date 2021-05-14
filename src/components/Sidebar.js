import React, { useEffect } from 'react';
import './Sidebar.css';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import InboxIcon from '@material-ui/icons/Inbox';
import SidebarLine from './SidebarLine';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from '../StateProvider';
import ChannelModal from './ChannelModal';
import db from '../db/firebase';

function Sidebar() {
  const [{ channels }, dispatch] = useStateValue();

  useEffect(() => {
    // set channels
    db.collection('rooms')
      .orderBy('name')
      .onSnapshot((snapshot) => {
        dispatch({
          type: 'SET_CHANNELS',
          payload: snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          })),
        });
      });
  }, [dispatch]);

  useEffect(() => {
    if (channels.length > 0) {
      dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: channels[0].id });
    }
  }, [channels, dispatch]);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <h3 className='sidebar__header-title'>SmartphoneAr</h3>
        <ExpandMoreRoundedIcon className='sidebar__icon' />
      </div>
      <div className='sidebar__body'>
        <SidebarLine Icon={InsertCommentOutlinedIcon} title='Threads' />
        <SidebarLine Icon={QuestionAnswerOutlinedIcon} title='All DMs' />
        <SidebarLine Icon={InboxIcon} title='Mentions & Reactions' />
        <SidebarLine Icon={MoreVertIcon} title='More' />
        <br />
        <SidebarLine Icon={ExpandMoreIcon} title='Channels' />
        <br />
        {channels.map((channel) => (
          <SidebarLine
            title={channel.name}
            key={channel.id}
            id={channel.id}
            subChannel={true}
          />
        ))}
        <ChannelModal />
      </div>
    </div>
  );
}

export default Sidebar;
