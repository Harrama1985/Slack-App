import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Users from "../components/users";
import firebase from "../firebase/firebase";
import {
  setCurrentChannel,
  isPrivateChannel,
} from "../redux/channel/channelActions";

function UsersContainer({
  user,
  setCurrentChannel,
  isPrivateChannel,
  currentChannel,
}) {
  const usersRef = firebase.db.ref("users");
  const connectedRef = firebase.db.ref(".info/connected");
  const presenceRef = firebase.db.ref("presence");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    connectUser(users);
    return () => {
      usersRef.off();
      connectedRef.off();
      presenceRef.off();
    };
  }, [user]);

  function connectUser() {
    const loadUsers = [];
    usersRef.on("child_added", (snap) => {
      if (user && user.uid !== snap.key) {
        let snapUser = snap.val();
        snapUser["uid"] = snap.key;
        snapUser["status"] = "offline";
        loadUsers.push(snapUser);
        presenceRef.on("child_added", (snap) => {
          if (user?.uid !== snap.key) {
            const updateUsers = loadUsers.reduce((acc, user) => {
              if (snap.key === user.uid) {
                user["status"] = "online";
              }
              return acc.concat(user);
            }, []);
            setUsers([...updateUsers]);
          }
        });
        presenceRef.on("child_removed", (snap) => {
          if (user?.uid !== snap.key) {
            const updateUsers = loadUsers.reduce((acc, user) => {
              if (snap.key === user.uid) {
                user["status"] = "offline";
              }
              return acc.concat(user);
            }, []);
            setUsers([...updateUsers]);
          }
        });
        if (users.length === 0) {
          setUsers([...loadUsers]);
        }
      }
    });
    connectedRef.on("value", (snap) => {
      if (user && snap.val() === true) {
        const ref = presenceRef.child(user.uid);
        ref.set(true);
        ref.onDisconnect().remove((err) => console.log(err));
      }
    });
  }

  function changeUser(user) {
    const channelId = getChannelId(user.uid);
    const newData = {
      id: channelId,
      name: user.name,
    };
    setCurrentChannel(newData);
    isPrivateChannel(true);
  }

  function getChannelId(userId) {
    return userId < user.uid
      ? `${userId}/${user.uid}`
      : `${user.uid}/${userId}`;
  }

  function userActive(userId) {
    return currentChannel?.id.includes(userId);
  }
  return (
    <Users>
      <Users.Header countUsers={users.length} />
      {users &&
        users.map((user) => (
          <Users.User
            key={user.uid}
            onClick={() => changeUser(user)}
            userName={user.name}
            status={user.status}
            active={userActive(user.uid)}
          />
        ))}
    </Users>
  );
}

const mapStateToProps = ({ channel }) => ({
  currentChannel: channel.currentChannel,
});
export default connect(mapStateToProps, {
  setCurrentChannel,
  isPrivateChannel,
})(UsersContainer);
