import copyImg from "../assets/images/copy.svg"
import "../styles/room-code.scss";


type RoomCodeProps = {
  code: string;
}

function RoomCode(props: RoomCodeProps){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }
  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar room code" />
      </div>
      <span>#{props.code}</span>
    </button>
  )
}

export default RoomCode;