export default function Post(props) {
  return (
    <div>
      <h1>{props._id}</h1>
      <p>{props.postText}</p>
      <p>Made by: {props.postAuthor}</p>
    </div>
  )
}