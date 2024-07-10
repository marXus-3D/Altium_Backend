Endpoints
  <ul>
    <li>
        <ol>/users
          <li>get - get's all the users from the database without any filter</li>
          <li>post - posts a new user to the database</li>
          <li>
            <ol>/:id
              <li>get - get's a specific user by their id</li>
              <li>put - used to update any attribute of a specific user</li>
            </ol>
          </li>
        </ol>
    </li>
    <li>
        <ol>/followers
          <li>delete - used to delete a follower basically unfollowing a user</li>
          <li>post - used to follow a person</li>
          <li>
            <ol>/:id
              <li>get - gets all the followers a single user has based on their id</li>
            </ol>
          </li>
        </ol>
    </li>
        <li>
        <ol>/posts
          <li>post - used to post any kind of posts by a user</li>
          <li>
            <ol>/:id
              <li>get - used to get a specific post by it's id</li>
            </ol>
          </li>
        </ol>
    </li>
    </li>
        <li>
        <ol>/message
          <li>post - used to post direct messages between users</li>
          <li>get - used to get all the chat messages between two users</li>
        </ol>
    </li>
  </ul>
<p>All endpoints that don't have an id in their parameter accept data in their body in a json format.

-------- json template's coming soon -------------</p>
