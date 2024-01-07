function PriorityColor({ priority }: { priority: string }) {
  if (priority === "Highly Important") {
    return <div className="bg-red-700 rounded-full w-6 aspect-square" />;
  }

  if (priority === "Important") {
    return <div className="bg-orange-500 rounded-full w-6 aspect-square" />;
  }

  if (priority === "Normal") {
    return <div className="bg-green-500 rounded-full w-6 aspect-square" />;
  }

  return <div className="bg-neutral-400 rounded-full w-6 aspect-square" />;
}

export default PriorityColor;
