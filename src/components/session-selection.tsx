import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import { CardHeader, CardContent, CardDescription, CardTitle, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
export function SessionSelection(){
  return (
    <div className="flex flex-col min-h-screen">
     <div className="flex flex-col justify-center items-center h-screen bg-[rgb(20,27,45)]">
      <Card className="w-full max-w-md bg-[rgb(31,42,64)] text-white">
       <CardHeader>
        <CardTitle className="text-2xl text-white">Choose Session</CardTitle>
         <CardDescription className="text-gray-300">Select an existing session or create a new one.</CardDescription>
        </CardHeader>
       <CardContent>
      <div className="grid gap-4">
        <Select className="w-full">
          <SelectTrigger className="w-full bg-[rgb(31,42,64)] border border-[rgb(81,81,81)] hover:border-white">
            <SelectValue className="text-[#adadad]" placeholder="Select a session" />
          </SelectTrigger>
          <SelectContent className="bg-[rgb(18,18,18)] border border-[rgb(81,81,81)]">
            <SelectGroup>
              <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="session1">
                Session 1
              </SelectItem>
              <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="session2">
                Session 2
              </SelectItem>
              <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="session3">
                Session 3
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="bg-[rgb(104,112,250)] text-white hover:bg-[rgb(104,112,250)]/90" type="submit">
          Enter Session
        </Button>
      </div>
      <div className="grid gap-4 mt-4">
        <Input
          className="bg-[rgb(31,42,64)] border border-[rgb(81,81,81)] text-gray-300 placeholder-gray-400 focus:border-white"
          id="newSession"
          placeholder="Enter a new session ID"
          type="text"
        />
        <Button className="bg-[rgb(104,112,250)] text-white hover:bg-[rgb(104,112,250)]/90" type="submit">
          Create Session
        </Button>
      </div>
    </CardContent>
  </Card>
</div>
</div>
  )
}
