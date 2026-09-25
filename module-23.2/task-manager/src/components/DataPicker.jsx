"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ------------------------------------
// Date object → readable text
// Example:
// Date object → "September 24, 2026"
// ------------------------------------
function formatDate(date) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ------------------------------------
// Check whether a Date object is valid
// ------------------------------------
function isValidDate(date) {
  if (!date) {
    return false;
  }

  return !isNaN(date.getTime());
}

// ------------------------------------
// "2026-09-24"
//       ↓
// JavaScript Date object
//
// We manually create the Date object so
// timezone problems are avoided.
// ------------------------------------
function parseDate(dateString) {
  if (!dateString) {
    return undefined;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return isValidDate(date) ? date : undefined;
}

// ------------------------------------
// Date object
//       ↓
// "2026-09-24"
// ------------------------------------
function formatDateForTask(date) {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ------------------------------------
// Controlled DatePicker component
// ------------------------------------
export function DatePickerInput({ value, onChange }) {
  // Convert parent's string value into Date object
  const initialDate = parseDate(value);

  const [open, setOpen] = React.useState(false);

  // Currently selected date
  const [date, setDate] = React.useState(initialDate);

  // Currently visible calendar month
  const [month, setMonth] = React.useState(initialDate || new Date());

  // Text shown inside the input
  const [inputValue, setInputValue] = React.useState(formatDate(initialDate));

  // ------------------------------------
  // If parent's value changes,
  // update this component.
  // ------------------------------------
  React.useEffect(() => {
    const newDate = parseDate(value);

    setDate(newDate);

    setMonth(newDate || new Date());

    setInputValue(formatDate(newDate));
  }, [value]);

  // ------------------------------------
  // User types a date manually
  // ------------------------------------
  const handleInputChange = (e) => {
    const typedValue = e.target.value;

    setInputValue(typedValue);

    const parsedDate = new Date(typedValue);

    if (isValidDate(parsedDate)) {
      setDate(parsedDate);
      setMonth(parsedDate);

      // Send YYYY-MM-DD to parent
      if (onChange) {
        onChange(formatDateForTask(parsedDate));
      }
    }
  };

  // ------------------------------------
  // User selects a date from calendar
  // ------------------------------------
  const handleDateSelect = (selectedDate) => {
    if (!selectedDate) {
      return;
    }

    // Update DatePicker's local state
    setDate(selectedDate);

    setMonth(selectedDate);

    setInputValue(formatDate(selectedDate));

    // Close calendar
    setOpen(false);

    // Send new date to parent
    if (onChange) {
      onChange(formatDateForTask(selectedDate));
    }
  };

  return (
    <Field className="mx-auto w-48">
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={inputValue}
          placeholder="June 01, 2025"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />

                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
