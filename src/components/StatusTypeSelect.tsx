import React, { useEffect } from "react";
import {ChipProps, Select, SelectItem, Selection} from "@nextui-org/react";
import {statusOptions} from "@/data/selection";

interface TransactionTypeSelectProps {
  onStatusSelect: (statusType: string) => void;
}

export default function TransactionTypeSelect({ onStatusSelect }: TransactionTypeSelectProps) {
  const [value, setValue] = React.useState<string>("");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onStatusSelect(e.target.value)
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
        <div className="flex flex-row">
          <Select
            variant="bordered"
            className="max-w-xs"
            onChange={handleSelectionChange}
            isRequired
            defaultSelectedKeys={["active"]}
        >
            {statusOptions.map((type) => (
            <SelectItem key={type.value} value={type.value}>
                {type.label}
            </SelectItem>
            ))}
          </Select>
        </div>
    </div>
  );
}
