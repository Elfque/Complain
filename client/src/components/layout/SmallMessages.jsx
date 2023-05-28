const SmallMessages = ({ message, mine }) => {
  return (
    <div className={mine ? "flex justify-end" : ""}>
      <div className="receive text-[11px] w-3/5 mb-4 bg-greeny/10 p-2 rounded-[10px] text-black">
        {message.messageText}
      </div>
    </div>
  );
};

export default SmallMessages;
