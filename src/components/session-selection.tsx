/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/JRJwKvjcJjg
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Rethink_Sans } from 'next/font/google'
import { Archivo } from 'next/font/google'

rethink_sans({
  subsets: ['latin'],
  display: 'swap',
})

archivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table"

export function RttDash() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-[#F58025] text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <FlagIcon className="h-6 w-6 text-white" />
          <h1 className="text-xl font-semibold text-white">Company Realtime Testing</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button className="rounded-full" size="icon" variant="ghost">
            <HelpCircleIcon className="h-6 w-6 text-white" />
            <span className="sr-only">Help</span>
          </Button>
        </div>
      </header>
      <div className="flex h-full">
        <aside className="bg-[rgb(31,42,64)] w-[200px] p-6 flex flex-col gap-4 sticky top-[60px] left-0 h-[calc(100vh-60px)] z-40">
          <div className="flex flex-col gap-4 sticky top-0">
            <nav className="grid gap-2">
              <Link
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[rgb(104,112,250)] hover:text-white text-[#adadad]"
                href="#"
              >
                <HomeIcon className="h-4 w-4 text-[#adadad] hover:text-white" />
                <span>Dashboard</span>
              </Link>
              <Link
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[rgb(104,112,250)] hover:text-white text-[#adadad]"
                href="#"
              >
                <SettingsIcon className="h-4 w-4 text-[#adadad] hover:text-white" />
                <span>Settings</span>
              </Link>
              <Link
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[rgb(104,112,250)] hover:text-white text-[#adadad]"
                href="#"
              >
                <LogOutIcon className="h-4 w-4 text-[#adadad] hover:text-white" />
                <span>Logout</span>
              </Link>
            </nav>
          </div>
        </aside>
        <div className="px-6 py-4 flex flex-col gap-4 flex-1 bg-[rgb(20,27,45)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 bg-[rgb(20,27,45)] text-[#ffffff] p-4">
            <div className="flex flex-col items-start gap-4">
              <div className="w-full sm:w-[400px]">
                <Select className="w-full">
                  <SelectTrigger className="w-full bg-[rgb(31,42,64)] border border-gray-200 border-[rgb(81,81,81)] hover:border-white dark:border-gray-800">
                    <SelectValue className="text-[#adadad]" placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(18,18,18)] border border-gray-200 border-[rgb(81,81,81)] dark:border-gray-800">
                    <SelectGroup>
                      <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="template1">
                        Template 1
                      </SelectItem>
                      <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="template2">
                        Template 2
                      </SelectItem>
                      <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="template3">
                        Template 3
                      </SelectItem>
                      <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="template4">
                        Template 4
                      </SelectItem>
                      <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="template5">
                        Template 5
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Button
                  className="text-[#adadad] bg-[rgb(31,42,64)] border border-gray-200 border-[rgb(81,81,81)] hover:bg-[rgb(104,112,250)] hover:text-white dark:border-gray-800"
                  variant="outline"
                >
                  Prepare
                </Button>
                <Button className="text-[#adadad] bg-[rgb(31,42,64)] border border-gray-200 border-[rgb(81,81,81)] hover:bg-[rgb(104,112,250)] hover:text-white dark:border-gray-800">
                  Execute
                </Button>
              </div>
            </div>
            <div className="flex flex-row items-end gap-4">
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-col justify-self-start w-[200px]">
                    <Select className="w-full mb-2">
                      <SelectTrigger className="w-full bg-[rgb(31,42,64)] border border-gray-200 border-[rgb(81,81,81)] hover:border-white dark:border-gray-800">
                        <SelectValue className="text-[#adadad]" placeholder="Set Time for Session" />
                      </SelectTrigger>
                      <SelectContent className="bg-[rgb(18,18,18)] border border-gray-200 border-[rgb(81,81,81)] dark:border-gray-800">
                        <SelectGroup>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="1">
                            1
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="2">
                            2
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="3">
                            3
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="5">
                            5
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="10">
                            10
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="15">
                            15
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="20">
                            20
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="25">
                            25
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="30">
                            30
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="45">
                            45
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="60">
                            1 hour
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="75">
                            75
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="90">
                            90
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="105">
                            105
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="120">
                            2 hours
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="135">
                            135
                          </SelectItem>
                          <SelectItem className="text-[#adadad] hover:bg-[rgba(255,255,255,0.08)]" value="150">
                            150
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#ffffff] text-sm">Start Time</span>
                    <span className="font-medium text-[#ffffff]">12:34:56</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#ffffff] text-sm">End Time</span>
                    <span className="font-medium text-[#ffffff]">12:35:45</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[#ffffff] text-sm">Time Elapsed</span>
                  <span className="font-medium text-[#ffffff]">49 sec</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="w-full border-[rgb(81,81,81)]" />
          <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-auto bg-[rgb(20,27,45)] text-[#ffffff]">
            <div className="col-span-full flex items-center justify-between">
              <h2 className="text-xl font-semibold">Template 1</h2>
              <span className="text-[#ffffff] text-sm">2024-04-29</span>
            </div>
            <Card className="bg-[rgb(31,42,64)] rounded-lg shadow-sm h-full border-0 overflow-hidden">
              <CardHeader className="bg-[rgb(104,112,250)] p-4 rounded-t-lg">
                <div className="text-lg font-medium text-[rgb(255,255,255)]">User 1234</div>
              </CardHeader>
              <CardContent className="p-4 space-y-2 h-full flex flex-col rounded-lg">
                <div className="bg-[rgb(31,42,64)] p-2 rounded-md overflow-y-auto flex-1">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          12:34:56
                        </TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">3</TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          {`
                                              # Update a user
                                              curl -X PUT -H "Content-Type: application/json" -d 'name: "Jane Doe", "email": "jane@example.com"}' http://api.example.com/users/1234
                                            `}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          12:34:56
                        </TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">2</TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          # List all users curl http://api.example.com/users
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          12:34:56
                        </TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">1</TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          {`
                                              # Create a new user
                                              curl -X POST -H "Content-Type: application/json" -d 'name: "John Doe", "email": "john@example.com"}' http://api.example.com/users
                                            `}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          12:34:57
                        </TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">4</TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          # Get user details curl http://api.example.com/users/1234
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          12:34:58
                        </TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">5</TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          # Delete a user curl -X DELETE http://api.example.com/users/1234
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          12:34:59
                        </TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">6</TableCell>
                        <TableCell className="text-[rgba(255,255,255)] border-b border-[rgb(81,81,81)]">
                          {`
                                              # Create a new order
                                              curl -X POST -H "Content-Type: application/json" -d 'product: "Widget", "quantity": 2}' http://api.example.com/users/1234/orders
                                            `}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[rgb(31,42,64)] rounded-lg shadow-sm h-full border-0 overflow-hidden">
              <CardHeader className="bg-[rgb(104,112,250)] p-4 rounded-t-lg">
                <div className="text-lg font-medium text-[rgb(255,255,255)]">User 5678</div>
              </CardHeader>
              <CardContent className="p-4 space-y-2 h-full flex flex-col rounded-lg">
                <div className="bg-[rgb(31,42,64)] p-2 rounded-md overflow-y-auto flex-1">
                  <Table>
                    <TableBody>
                      <TableRow />
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}

function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}


function HelpCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}




export function SessionSelection() {
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
    )
}