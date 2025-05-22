# ENMAMAR

## Future TODO

- [x] Add mock data for the featured and popular courses by creating a folder that hold the data

- [x] if (isLoading) return; // Prevent multiple submissions when submitting. for both input field and submittion
- [x] Password confimation
- [ ] Add pagination for api requests
- [ ] Add status for each api return response and handle it based on that
- [ ] Course:
  - [ ] A views and durations for the courses(must for the admin)
  - [ ] Add Thumbnail(DB)
- [ ] Add an error component and when error occures display the error component page
- [x] Add Loading on the datas until it get the data(Shemear effect) .
- [ ] Implement the sort functionality
  - [x] In the instructor table
  - [x] In the course list admin page
- [ ] Handle the error some components I just console them in order not to get an error/issue
- [ ] Add total duration time in the courseDescription (check backend)
- [ ] Handle a better UI when their is no lesson(just in case)

- [ ] Inorder to promote a student to instructor theri needs to be a get all students api(currently theri is get all instructor which is not correct because we are going to promote the student to teacher)
- [ ] Improve the error handling in the signup especially the phone number(but chack all)
- [ ] Properly handle the enroll lesson hide lessons that are after the first one(backend endpoint checker for enrollemnt)
- [ ] Improve the otp when sending phone number from the signup page it uses a params so that the number can be seen in the url and can be changed (Improve this and secure it)

- [ ] Enrich the metadata with viewport, themeColor, icons, OpenGraph and robots settings.Add your favicon link in the <head>. Inject Google Analytics (or GTM) via next/script using your NEXT_PUBLIC_GA_ID. Keep <html lang> and your providers as is.

-[ ] Improve the fetching try to use tanstack if its nessassry try to cache or use statemanagemnt to decrease the call to the api like in one page if i need only the lenght of a list from the endpoint and inother in other i want the list it would be redundant to call the endpoint twice

- [ ] For latter use check the commented codes probably they have a better ui
- [ ] Social media accounts
