const SmallMessages = ({ message, mine }) => {
  return (
    <div className={mine ? "flex justify-end" : ""}>
      <div
        className={`receive text-[11px] w-3/5 my-2 ${
          mine ? "bg-greeny/10 text-black" : "bg-greeny text-white"
        } p-2 rounded-[10px]`}
      >
        {message.messageText}
        <div className="time">
          {new Date(message.date).getHours()} :{" "}
          {new Date(message.date).getMinutes()}
        </div>
      </div>
    </div>
  );
};

export default SmallMessages;
