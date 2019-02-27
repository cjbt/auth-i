import React from 'react';

const Users = props => {
  const { username } = props.user;
  return (
    <>
      <h1>{username}</h1>
    </>
  );
};

export default Users;
