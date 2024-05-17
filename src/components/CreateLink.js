import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $setup: String!
    $punchline: String!
    $type: String!
    $url: String!
  ) {
    createLink(setup: $setup, punchline: $punchline, type: $type, url: $url) {
      id
      url
      setup
      punchline 
      type
    }
  }
`;

const CreateLink = () => {
  const navigate = useNavigate();  
  const [formState, setFormState] = useState({
    setup: '',
    punchline: '',
    type: '',
    url: ''
  });

const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      setup: formState.setup,
      punchline: formState.punchline,
      type: formState.type,
      url: formState.url
    },
    onCompleted: () => navigate('/')    
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.setup}
            onChange={(e) =>
              setFormState({
                ...formState,
                setup: e.target.value
              })
            }
            type="text"
            placeholder="A setup for the link"
          />
          <input
            className="mb2"
            value={formState.punchline}
            onChange={(e) =>
              setFormState({
                ...formState,
                punchline: e.target.value
              })
            }
            type="text"
            placeholder="A punchline for the link"
          />
          <input
            className="mb2"
            value={formState.type}
            onChange={(e) =>
              setFormState({
                ...formState,
                type: e.target.value
              })
            }
            type="text"
            placeholder="A type for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;