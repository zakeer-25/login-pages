function getUsers(){
  const raw = localStorage.getItem('fs_users')
  return raw ? JSON.parse(raw) : {}
}
function saveUsers(obj){
  localStorage.setItem('fs_users', JSON.stringify(obj))
}
function registerUser({name,email,password}){
  const users = getUsers()
  if(users[email]) return {success:false,message:'An account with this email already exists'}
  users[email] = {name,email,password}
  saveUsers(users)
  return {success:true}
}
function loginUser({email,password}){
  const users = getUsers()
  const u = users[email]
  if(!u) return {success:false,message:'No account found for that email'}
  if(u.password !== password) return {success:false,message:'Incorrect password'}
  localStorage.setItem('fs_current', JSON.stringify({name:u.name,email:u.email}))
  return {success:true}
}
function getCurrentUser(){
  const raw = localStorage.getItem('fs_current')
  return raw ? JSON.parse(raw) : null
}
function signOut(){
  localStorage.removeItem('fs_current')
}
