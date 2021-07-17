import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Started from "../components/started";
import firebase from "../firebase/firebase";
import {
  setCurrentChannel,
  isPrivateChannel,
} from "../redux/channel/channelActions";

function StartedContainer({
  user,
  currentChannel,
  setCurrentChannel,
  isPrivateChannel,
}) {
  const [startedChannels, setStartedChannels] = useState([]);
  const usersRef = firebase.db.ref("users");
  useEffect(() => {
    if (user) {
      usersRef.child(`${user.uid}/started`).on("child_added", (snap) => {
        const channelstarted = {
          id: snap.key,
          ...snap.val(),
        };
        setStartedChannels((prevState) => [...prevState, channelstarted]);
      });

      usersRef.child(`${user.uid}/started`).on("child_removed", (snap) => {
        const filterChannels = startedChannels.filter(
          (channel) => channel.id !== snap.key
        );

        setStartedChannels([...filterChannels]);
      });
      return () => usersRef.child(`${user.uid}/started`).off();
    }
  }, [user, currentChannel]);

  function changeChannel(channel) {
    setCurrentChannel(channel);
    isPrivateChannel(false);
  }

  return (
    <Started>
      <Started.Header countStarted={startedChannels.length} />
      {startedChannels.length > 0 &&
        startedChannels.map((channel) => {
          return (
            <Started.Channel
              key={channel.id}
              channelName={channel.name}
              onClick={() => changeChannel(channel)}
              active={channel.id === currentChannel?.id}
            />
          );
        })}
    </Started>
  );
}

export default connect(null, { setCurrentChannel, isPrivateChannel })(
  StartedContainer
);
