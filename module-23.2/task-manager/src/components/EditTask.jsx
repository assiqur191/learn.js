import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
// import { useState } from "react";

const EditTask = ({ task, onTaskUpdate }) => {
  //   const [alignItemWithTrigger, setAlignItemWithTrigger] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const items = [
    { label: "Select a status", value: null },
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "In Progress",
      label: "In Progress",
    },
    {
      value: "Completed",
      label: "Completed",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title: title,
      description: description,
      status: status,
      completed: status === "Completed",
    };
    onTaskUpdate(updatedTask);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil
          type="button"
          className=" hover:bg-green-400 hover:rounded-full hover:text-white p-2 h-11 w-11"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update your task information.</DialogDescription>
        </DialogHeader>

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label className={"ml-2"}>Title</Label>
              <Input
                placeholder="Enter text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className={"ml-2"}>Description</Label>
              <Textarea
                placeholder="Type your message here."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Status</SelectLabel>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-10 flex justify-end">
              <Button type="submit" variant="secondary">
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
