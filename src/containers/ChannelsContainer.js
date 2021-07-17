import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Channels from "../components/channels";
import firebase from "../firebase/firebase";
import {
  setCurrentChannel,
  isPrivateChannel,
} from "../redux/channel/channelActions";

function ChannelsContainer({
  user,
  currentChannel,
  setCurrentChannel,
  isPrivateChannel,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState(false);
  const [channels, setChannels] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  //notification
  const [channel, setChannel] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const messageRef = firebase.db.ref("messages");
  const channelRef = firebase.db.ref("channels");
  const typingRef = firebase.db.ref("typing");

  useEffect(() => {
    const loadedChannel = [];

    channelRef.on("child_added", (snap) => {
      loadedChannel.push(snap.val());
      setChannels([...loadedChannel]);
      setCurrentChannel(loadedChannel[0]);
      firstChannel(loadedChannel[0]);
      //notification
      addNotifications(snap.key);
    });

    return () => {
      channelRef.off();
      messageRef.off();
    };
  }, []);

  function addNotifications(channelId) {
    messageRef.child(channelId).on("value", (snap) => {
      let lastTotal = 0;
      let index = notifications.findIndex(
        (notific) => notific.id === channelId
      );
      if (index !== -1) {
        if (channelId !== channel?.id) {
          lastTotal = notifications[index].total;
          if (snap.numChildren() - lastTotal > 0) {
            notifications[index].count = snap.numChildren() - lastTotal;
          }
        }
        notifications[index].lastKnowTotal = snap.numChildren();
      } else {
        notifications.push({
          id: channelId,
          total: snap.numChildren(),
          lastKnowTotal: snap.numChildren(),
          count: 0,
        });
      }
    });
    setNotifications(notifications);
  }

  function firstChannel(channel) {
    if (firstLoad && channel.length > 0) {
      setCurrentChannel(channel);
      setFirstLoad(false);
      setChannel(channel);
    }
  }

  function addChannel() {
    if (name && description && user) {
      const key = channelRef.push().key;
      const newChannel = {
        id: key,
        name: name,
        description: description,
        createdBy: {
          id: user.uid,
          userName: user.displayName,
          avatar: user.photoURL,
        },
      };
      channelRef
        .child(key)
        .update(newChannel)
        .then(() => {
          setName("");
          setDescription("");
          closeModel();
        });
    }
  }
  function closeModel() {
    setModel(false);
  }

  function changeChannel(channel) {
    setCurrentChannel(channel);
    typingRef.child(currentChannel.id).child(user.uid).remove();
    isPrivateChannel(false);
    setChannel(channel);
    clearNotifications();
  }

  function clearNotifications() {
    let index = notifications.findIndex(
      (notific) => notific.id === channel?.id
    );
    if (index !== -1) {
      let updateNotifications = [...notifications];
      updateNotifications[index].total = notifications[index].lastTotal;
      updateNotifications[index].count = 0;
      setNotifications(updateNotifications);
    }
  }
  function countNotification(channel) {
    let count = 0;
    notifications.forEach((notific) => {
      if (notific.id === channel.id) {
        count = notific.count;
      }
    });
    if (count > 0) return count;
  }

  return (
    <Channels>
      <Channels.Header
        openModel={() => setModel(true)}
        countChannels={channels.length}
      />
      {channels.length > 0
        ? channels.map((channel) => {
            return (
              <Channels.Channel
                key={channel.id}
                channelName={channel.name}
                onClick={() => changeChannel(channel)}
                active={channel.id === currentChannel?.id}
              >
                {countNotification(channel)}
              </Channels.Channel>
            );
          })
        : " "}

      {model && (
        <Channels.Model closeModel={closeModel} addChannel={addChannel}>
          <Channels.Input
            placeholder="Channel name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Channels.Input
            placeholder="Channel description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Channels.Model>
      )}
    </Channels>
  );
}

export default connect(null, { setCurrentChannel, isPrivateChannel })(
  ChannelsContainer
);
