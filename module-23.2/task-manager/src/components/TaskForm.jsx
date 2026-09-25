import { BookmarkPlus, CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
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
import { DatePickerInput } from "./DataPicker";
import { Button } from "./ui/button";
import { useState } from "react";
// import React from "react";

export const TaskForm = ({ onAddTask }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const items = [
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

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      status: status,
      completed: status === "completed",
      dueDate: dueDate,
    };
    onAddTask(newTask);

    setOpen(false);

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setDueDate("");
  };

  return (
    // /////
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <DialogTrigger asChild>
          <div className="flex md:w-auto flex-col md:flex-row items-center justify-center gap-5 w-auto bg-white rounded-2xl shadow-md  p-5 mt-4">
            {/* search */}
            <div className="flex basis-[60%] items-center gap-2 rounded-full border border-slate-400 bg-white px-4 py-1 transition focus-within:ring-2 focus-within:ring-blue-500 ">
              <CirclePlus className="h-10 w-10 text-white bg-blue-500 rounded-full" />
              <input
                type="text"
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                placeholder="Add a task..."
              />
            </div>
            {/* button */}
            <div>
              <button className="mt-4 md:mt-0 rounded-2xl bg-blue-400 px-4 py-2 w-40 text-sm font-medium text-white hover:bg-blue-500 cursor-pointer flex items-center gap-2">
                <BookmarkPlus />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Create a new Task.</DialogDescription>
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

            <div className="flex flex-row gap-2 justify-between">
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
              <div className="flex flex-col gap-2">
                <Label className="ml-2">Due Date</Label>

                <DatePickerInput value={dueDate} onChange={setDueDate} />
              </div>
            </div>

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
export default TaskForm;
