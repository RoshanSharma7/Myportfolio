// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi'
// import { Helmet } from 'react-helmet-async'
// const API = import.meta.env.VITE_API_URL

// function authHeaders() {
//   const token = localStorage.getItem('token')
//   return { headers: { Authorization: 'Bearer ' + token } }
// }

// function TabBtn({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         padding:      '8px 16px',
//         borderRadius: '8px',
//         border:       'none',
//         background:   active ? '#1a1a2e' : 'transparent',
//         color:        active ? '#fff' : '#9999bb',
//         fontFamily:   'Fira Code, monospace',
//         fontSize:     '12px',
//         cursor:       'pointer',
//         transition:   'all 0.3s',
//         whiteSpace:   'nowrap',
//       }}
//     >
//       {label}
//     </button>
//   )
// }

// function ActionBtn({ icon, color, onClick, title }) {
//   return (
//     <button
//       onClick={onClick}
//       title={title}
//       style={{
//         display:        'flex',
//         alignItems:     'center',
//         justifyContent: 'center',
//         width:          '32px',
//         height:         '32px',
//         borderRadius:   '6px',
//         border:         '1px solid #e0e0f0',
//         background:     '#fff',
//         color:          color || '#1a1a2e',
//         cursor:         'pointer',
//         transition:     'all 0.2s',
//       }}
//       onMouseOver={function(e) { e.currentTarget.style.background = '#f0f0f8' }}
//       onMouseOut={function(e)  { e.currentTarget.style.background = '#fff'    }}
//     >
//       {icon}
//     </button>
//   )
// }

// function Modal({ title, onClose, children }) {
//   return (
//     <div style={{
//       position:       'fixed',
//       top:            0,
//       left:           0,
//       right:          0,
//       bottom:         0,
//       background:     'rgba(0,0,0,0.4)',
//       display:        'flex',
//       alignItems:     'center',
//       justifyContent: 'center',
//       zIndex:         1000,
//       padding:        '1rem',
//     }}>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         style={{
//           background:   '#fff',
//           borderRadius: '16px',
//           padding:      '1.5rem',
//           width:        '100%',
//           maxWidth:     '500px',
//           maxHeight:    '90vh',
//           overflowY:    'auto',
//           boxShadow:    '0 20px 60px rgba(0,0,0,0.2)',
//         }}
//       >
//         <div style={{
//           display:        'flex',
//           justifyContent: 'space-between',
//           alignItems:     'center',
//           marginBottom:   '1.5rem',
//         }}>
//           <h3 style={{
//             fontFamily: 'Space Grotesk, sans-serif',
//             fontSize:   '1.1rem',
//             fontWeight: '600',
//             color:      '#1a1a2e',
//             margin:     0,
//           }}>
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             style={{
//               background:     'none',
//               border:         'none',
//               cursor:         'pointer',
//               color:          '#9999bb',
//               fontSize:       '1.2rem',
//               display:        'flex',
//               alignItems:     'center',
//               justifyContent: 'center',
//             }}
//           >
//             <FiX />
//           </button>
//         </div>
//         {children}
//       </motion.div>
//     </div>
//   )
// }

// function FormField({ label, name, value, onChange, type, required, placeholder }) {
//   const inputStyle = {
//     width:        '100%',
//     padding:      '10px 14px',
//     borderRadius: '8px',
//     border:       '1.5px solid #e0e0f0',
//     fontFamily:   'Fira Code, monospace',
//     fontSize:     '13px',
//     color:        '#1a1a2e',
//     outline:      'none',
//     boxSizing:    'border-box',
//     marginBottom: '1rem',
//     transition:   'border-color 0.3s',
//   }

//   return (
//     <div>
//       <label style={{
//         fontFamily:   'Fira Code, monospace',
//         fontSize:     '11px',
//         color:        '#9999bb',
//         display:      'block',
//         marginBottom: '4px',
//         letterSpacing:'0.5px',
//       }}>
//         {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
//       </label>
//       {type === 'textarea' ? (
//         <textarea
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           rows={4}
//           style={{ ...inputStyle, resize: 'vertical' }}
//           onFocus={function(e) { e.target.style.borderColor = '#1a1a2e' }}
//           onBlur={function(e)  { e.target.style.borderColor = '#e0e0f0' }}
//         />
//       ) : type === 'select' ? null : (
//         <input
//           type={type || 'text'}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           style={inputStyle}
//           onFocus={function(e) { e.target.style.borderColor = '#1a1a2e' }}
//           onBlur={function(e)  { e.target.style.borderColor = '#e0e0f0' }}
//         />
//       )}
//     </div>
//   )
// }

// function SelectField({ label, name, value, onChange, options }) {
//   return (
//     <div>
//       <label style={{
//         fontFamily:   'Fira Code, monospace',
//         fontSize:     '11px',
//         color:        '#9999bb',
//         display:      'block',
//         marginBottom: '4px',
//         letterSpacing:'0.5px',
//       }}>
//         {label}
//       </label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         style={{
//           width:        '100%',
//           padding:      '10px 14px',
//           borderRadius: '8px',
//           border:       '1.5px solid #e0e0f0',
//           fontFamily:   'Fira Code, monospace',
//           fontSize:     '13px',
//           color:        '#1a1a2e',
//           outline:      'none',
//           boxSizing:    'border-box',
//           marginBottom: '1rem',
//           background:   '#fff',
//           cursor:       'pointer',
//         }}
//       >
//         {options.map(function(opt) {
//           return (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           )
//         })}
//       </select>
//     </div>
//   )
// }

// function SaveBtn({ loading, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={loading}
//       style={{
//         width:        '100%',
//         padding:      '12px',
//         borderRadius: '8px',
//         border:       'none',
//         background:   loading ? '#9999bb' : '#1a1a2e',
//         color:        '#fff',
//         fontFamily:   'Fira Code, monospace',
//         fontSize:     '13px',
//         cursor:       loading ? 'not-allowed' : 'pointer',
//         display:      'flex',
//         alignItems:   'center',
//         justifyContent:'center',
//         gap:          '8px',
//         marginTop:    '0.5rem',
//       }}
//     >
//       <FiCheck /> {loading ? 'saving...' : 'save()'}
//     </button>
//   )
// }

// function ProfileSection() {
//   const [profile, setProfile] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [saving,  setSaving]  = useState(false)
//   const [form,    setForm]    = useState({
//     name: '', title: '', bio: '', email: '',
//     phone: '', location: '',
//     projects_count: '', experience_years: '',
//     certifications_count: '', technologies_count: '',
//   })
//   const [avatar, setAvatar] = useState(null)
//   const [resume, setResume] = useState(null)

//   useEffect(function() {
//     axios.get(API + '/userauth/profile/')
//       .then(function(res) {
//         if (res.data.length > 0) {
//           setProfile(res.data[0])
//           setForm(res.data[0])
//         }
//         setLoading(false)
//       })
//       .catch(function() { setLoading(false) })
//   }, [])

//   function handleChange(e) {
//     setForm(function(prev) {
//       return { ...prev, [e.target.name]: e.target.value }
//     })
//   }

//   async function handleSave() {
//     try {
//       setSaving(true)
//       const formData = new FormData()
//       Object.keys(form).forEach(key => {
//         formData.append(key, form[key])
//       })
//       if (avatar) formData.append('avatar', avatar)
//       if (resume) formData.append('resume', resume)

//       if (profile) {
//         await axios.put(API + '/userauth/profile/' + profile.id + '/', formData, authHeaders())
//         toast.success('Profile updated!')
//       } else {
//         const res = await axios.post(API + '/userauth/profile/', formData, authHeaders())
//         setProfile(res.data)
//         toast.success('Profile created!')
//       }
//       setAvatar(null)
//       setResume(null)
//     } catch (err) {
//       console.error(err)
//       toast.error('Failed to save profile')
//     } finally {
//       setSaving(false)
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 1rem' }}>
//         <FormField label="name"     name="name"     value={form.name     || ''} onChange={handleChange} required placeholder="Your full name"  />
//         <FormField label="title"    name="title"    value={form.title    || ''} onChange={handleChange} required placeholder="Your job title"   />
//         <FormField label="email"    name="email"    value={form.email    || ''} onChange={handleChange} type="email" placeholder="your@email.com" />
//         <FormField label="phone"    name="phone"    value={form.phone    || ''} onChange={handleChange} placeholder="+91 XXXXXXXXXX"             />
//         <FormField label="location" name="location" value={form.location || ''} onChange={handleChange} placeholder="City, Country"             />
//       </div>
//       <Helmet>
//         <title>Admin - Roshan Sharma </title>
//     </Helmet>
//       <FormField label="bio" name="bio" value={form.bio || ''} onChange={handleChange} type="textarea" placeholder="Write something about yourself..." />

//       <div style={{ marginBottom: '1.5rem' }}>
//         <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>avatar (profile picture)</label>
//         {profile?.avatar && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {profile.avatar.split('/').pop()}</p>}
//         <input type="file" accept="image/*" onChange={function(e) { setAvatar(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
//       </div>

//       <div style={{ marginBottom: '1.5rem' }}>
//         <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>resume (PDF)</label>
//         {profile?.resume && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {profile.resume.split('/').pop()}</p>}
//         <input type="file" accept=".pdf,.doc,.docx" onChange={function(e) { setResume(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
//       </div>

//       <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb', fontSize: '11px', marginBottom: '0.8rem' }}>// stats shown on home page</p>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0 1rem' }}>
//         <FormField label="projects_count"       name="projects_count"       value={form.projects_count       || ''} onChange={handleChange} placeholder="10+" />
//         <FormField label="experience_years"     name="experience_years"     value={form.experience_years     || ''} onChange={handleChange} placeholder="2+"  />
//         <FormField label="certifications_count" name="certifications_count" value={form.certifications_count || ''} onChange={handleChange} placeholder="5+"  />
//         <FormField label="technologies_count"   name="technologies_count"   value={form.technologies_count   || ''} onChange={handleChange} placeholder="3+"  />
//       </div>

//       <SaveBtn loading={saving} onClick={handleSave} />
//     </div>
//   )
// }

// function ProjectsSection() {
//   const [projects, setProjects] = useState([])
//   const [loading,  setLoading]  = useState(true)
//   const [modal,    setModal]    = useState(false)
//   const [saving,   setSaving]   = useState(false)
//   const [editing,  setEditing]  = useState(null)
//   const [thumbnail, setThumbnail] = useState(null)
//   const [form,     setForm]     = useState({
//     title: '', description: '', tech_stack: '',
//     github_url: '', live_url: '', status: 'completed',
//   })

//   function fetchProjects() {
//     axios.get(API + '/projects/')
//       .then(function(res) { setProjects(res.data); setLoading(false) })
//       .catch(function()   { setLoading(false) })
//   }

//   useEffect(function() { fetchProjects() }, [])

//   function handleChange(e) {
//     setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
//   }

//   function openAdd() {
//     setEditing(null)
//     setForm({ title: '', description: '', tech_stack: '', github_url: '', live_url: '', status: 'completed' })
//     setThumbnail(null)
//     setModal(true)
//   }

//   function openEdit(project) {
//     setEditing(project)
//     setForm(project)
//     setThumbnail(null)
//     setModal(true)
//   }

//   async function handleSave() {
//     if (!form.title) { toast.error('Title is required'); return }
//     try {
//       setSaving(true)
//       const formData = new FormData()
//       Object.keys(form).forEach(key => { formData.append(key, form[key]) })
//       if (thumbnail) formData.append('thumbnail', thumbnail)

//       if (editing) {
//         await axios.put(API + '/projects/' + editing.id + '/', formData, authHeaders())
//         toast.success('Project updated!')
//       } else {
//         await axios.post(API + '/projects/', formData, authHeaders())
//         toast.success('Project added!')
//       }
//       setModal(false)
//       setThumbnail(null)
//       fetchProjects()
//     } catch (err) {
//       console.error(err)
//       toast.error('Failed to save project')
//     } finally {
//       setSaving(false)
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm('Delete this project?')) return
//     try {
//       await axios.delete(API + '/projects/' + id + '/', authHeaders())
//       toast.success('Project deleted!')
//       fetchProjects()
//     } catch (err) {
//       toast.error('Failed to delete project')
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
//         <FiPlus /> add_project()
//       </button>

//       {projects.length === 0 ? (
//         <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb', fontSize: '0.9rem' }}>no projects yet</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
//           {projects.map(function(project) {
//             return (
//               <div key={project.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</p>
//                   <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{project.status} · {project.tech_stack}</p>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
//                   <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(project)       }} title="Edit"   />
//                   <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(project.id)}} title="Delete" color="#e74c3c" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {modal && (
//         <Modal title={editing ? 'Edit Project' : 'Add Project'} onClose={function() { setModal(false) }}>
//           <FormField label="title"       name="title"       value={form.title       || ''} onChange={handleChange} required placeholder="Project title"       />
//           <FormField label="description" name="description" value={form.description || ''} onChange={handleChange} type="textarea" placeholder="Project description" />
//           <FormField label="tech_stack"  name="tech_stack"  value={form.tech_stack  || ''} onChange={handleChange} placeholder="React, Django, PostgreSQL"    />
//           <FormField label="github_url"  name="github_url"  value={form.github_url  || ''} onChange={handleChange} placeholder="https://github.com/..."       />
//           <FormField label="live_url"    name="live_url"    value={form.live_url    || ''} onChange={handleChange} placeholder="https://..."                   />
//           <SelectField label="status" name="status" value={form.status} onChange={handleChange} options={[ { value: 'completed', label: 'Completed' }, { value: 'ongoing',   label: 'Ongoing'   } ]} />
          
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>thumbnail (project screenshot)</label>
//             {editing?.thumbnail && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {editing.thumbnail.split('/').pop()}</p>}
//             <input type="file" accept="image/*" onChange={function(e) { setThumbnail(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
//           </div>

//           <SaveBtn loading={saving} onClick={handleSave} />
//         </Modal>
//       )}
//     </div>
//   )
// }

// function SkillsSection() {
//   const [skills,  setSkills]  = useState([])
//   const [loading, setLoading] = useState(true)
//   const [modal,   setModal]   = useState(false)
//   const [saving,  setSaving]  = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [form,    setForm]    = useState({ name: '', category: 'other', level: 'intermediate', icon: '' })

//   function fetchSkills() {
//     axios.get(API + '/skills/')
//       .then(function(res) { setSkills(res.data); setLoading(false) })
//       .catch(function()   { setLoading(false) })
//   }

//   useEffect(function() { fetchSkills() }, [])

//   function handleChange(e) {
//     setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
//   }

//   function openAdd() {
//     setEditing(null)
//     setForm({ name: '', category: 'other', level: 'intermediate', icon: '' })
//     setModal(true)
//   }

//   function openEdit(skill) {
//     setEditing(skill)
//     setForm(skill)
//     setModal(true)
//   }

//   async function handleSave() {
//     if (!form.name) { toast.error('Name is required'); return }
//     try {
//       setSaving(true)
//       if (editing) {
//         await axios.put(API + '/skills/' + editing.id + '/', form, authHeaders())
//         toast.success('Skill updated!')
//       } else {
//         await axios.post(API + '/skills/', form, authHeaders())
//         toast.success('Skill added!')
//       }
//       setModal(false)
//       fetchSkills()
//     } catch (err) {
//       toast.error('Failed to save skill')
//     } finally {
//       setSaving(false)
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm('Delete this skill?')) return
//     try {
//       await axios.delete(API + '/skills/' + id + '/', authHeaders())
//       toast.success('Skill deleted!')
//       fetchSkills()
//     } catch (err) {
//       toast.error('Failed to delete skill')
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
//         <FiPlus /> add_skill()
//       </button>

//       {skills.length === 0 ? (
//         <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no skills yet</p>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
//           {skills.map(function(skill) {
//             return (
//               <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0f0' }}>
//                 <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', color: '#1a1a2e' }}>{skill.name}</span>
//                 <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#9999bb' }}>{skill.category} · {skill.level}</span>
//                 <ActionBtn icon={<FiEdit2 size={12} />}  onClick={function() { openEdit(skill)        }} title="Edit"   />
//                 <ActionBtn icon={<FiTrash2 size={12} />} onClick={function() { handleDelete(skill.id) }} title="Delete" color="#e74c3c" />
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {modal && (
//         <Modal title={editing ? 'Edit Skill' : 'Add Skill'} onClose={function() { setModal(false) }}>
//           <FormField label="name"  name="name"  value={form.name  || ''} onChange={handleChange} required placeholder="e.g. React"    />
//           <SelectField label="category" name="category" value={form.category || 'other'} onChange={handleChange} options={[ { value: 'language', label: 'Languages' }, { value: 'framework', label: 'Frameworks' }, { value: 'database', label: 'Databases' }, { value: 'tools', label: 'Tools' }, { value: 'other', label: 'Other' } ]} />
//           <SelectField label="level" name="level" value={form.level} onChange={handleChange} options={[ { value: 'beginner',     label: 'Beginner'     }, { value: 'intermediate', label: 'Intermediate' }, { value: 'expert',       label: 'Expert'       } ]} />
//           <SaveBtn loading={saving} onClick={handleSave} />
//         </Modal>
//       )}
//     </div>
//   )
// }

// function ExperienceSection() {
//   const [experiences, setExperiences] = useState([])
//   const [loading,     setLoading]     = useState(true)
//   const [modal,       setModal]       = useState(false)
//   const [saving,      setSaving]      = useState(false)
//   const [editing,     setEditing]     = useState(null)
//   const [form,        setForm]        = useState({ company: '', role: '', location: '', start_date: '', end_date: '', is_current: false, description: '' })

//   function fetchExperiences() {
//     axios.get(API + '/experience/')
//       .then(function(res) { setExperiences(res.data); setLoading(false) })
//       .catch(function()   { setLoading(false) })
//   }

//   useEffect(function() { fetchExperiences() }, [])

//   function handleChange(e) {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
//     setForm(function(prev) { return { ...prev, [e.target.name]: value } })
//   }

//   function openAdd() {
//     setEditing(null)
//     setForm({ company: '', role: '', location: '', start_date: '', end_date: '', is_current: false, description: '' })
//     setModal(true)
//   }

//   function openEdit(exp) {
//     setEditing(exp)
//     setForm(exp)
//     setModal(true)
//   }

//   async function handleSave() {
//     if (!form.company || !form.role) { toast.error('Company and role are required'); return }
//     try {
//       setSaving(true)
//       if (editing) {
//         await axios.put(API + '/experience/' + editing.id + '/', form, authHeaders())
//         toast.success('Experience updated!')
//       } else {
//         await axios.post(API + '/experience/', form, authHeaders())
//         toast.success('Experience added!')
//       }
//       setModal(false)
//       fetchExperiences()
//     } catch (err) {
//       toast.error('Failed to save experience')
//     } finally {
//       setSaving(false)
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm('Delete this experience?')) return
//     try {
//       await axios.delete(API + '/experience/' + id + '/', authHeaders())
//       toast.success('Experience deleted!')
//       fetchExperiences()
//     } catch (err) {
//       toast.error('Failed to delete experience')
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
//         <FiPlus /> add_experience()
//       </button>

//       {experiences.length === 0 ? (
//         <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no experience yet</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
//           {experiences.map(function(exp) {
//             return (
//               <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
//                 <div style={{ flex: 1 }}>
//                   <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{exp.role}</p>
//                   <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{exp.company} {exp.is_current ? '· current' : ''}</p>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(exp)        }} title="Edit"   />
//                   <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(exp.id) }} title="Delete" color="#e74c3c" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {modal && (
//         <Modal title={editing ? 'Edit Experience' : 'Add Experience'} onClose={function() { setModal(false) }}>
//           <FormField label="company"    name="company"    value={form.company    || ''} onChange={handleChange} required placeholder="Company name"  />
//           <FormField label="role"       name="role"       value={form.role       || ''} onChange={handleChange} required placeholder="Your job title" />
//           <FormField label="location"   name="location"   value={form.location   || ''} onChange={handleChange} placeholder="City, Country"          />
//           <FormField label="start_date" name="start_date" value={form.start_date || ''} onChange={handleChange} type="date" />
//           <FormField label="end_date"   name="end_date"   value={form.end_date   || ''} onChange={handleChange} type="date" />
//           <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <input type="checkbox" name="is_current" checked={form.is_current} onChange={handleChange} id="is_current" />
//             <label htmlFor="is_current" style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#1a1a2e', cursor: 'pointer' }}>Currently working here</label>
//           </div>
//           <FormField label="description" name="description" value={form.description || ''} onChange={handleChange} type="textarea" placeholder="Describe your role..." />
//           <SaveBtn loading={saving} onClick={handleSave} />
//         </Modal>
//       )}
//     </div>
//   )
// }

// function EducationSection() {
//   const [educations, setEducations] = useState([])
//   const [loading,    setLoading]    = useState(true)
//   const [modal,      setModal]      = useState(false)
//   const [saving,     setSaving]     = useState(false)
//   const [editing,    setEditing]    = useState(null)
//   const [form,       setForm]       = useState({ institution: '', degree: '', field: '', start_year: '', end_year: '', is_current: false, grade: '' })

//   function fetchEducations() {
//     axios.get(API + '/education/')
//       .then(function(res) { setEducations(res.data); setLoading(false) })
//       .catch(function()   { setLoading(false) })
//   }

//   useEffect(function() { fetchEducations() }, [])

//   function handleChange(e) {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
//     setForm(function(prev) { return { ...prev, [e.target.name]: value } })
//   }

//   function openAdd() {
//     setEditing(null)
//     setForm({ institution: '', degree: '', field: '', start_year: '', end_year: '', is_current: false, grade: '' })
//     setModal(true)
//   }

//   function openEdit(edu) {
//     setEditing(edu)
//     setForm(edu)
//     setModal(true)
//   }

//   async function handleSave() {
//     if (!form.institution) { toast.error('Institution is required'); return }
//     try {
//       setSaving(true)
//       if (editing) {
//         await axios.put(API + '/education/' + editing.id + '/', form, authHeaders())
//         toast.success('Education updated!')
//       } else {
//         await axios.post(API + '/education/', form, authHeaders())
//         toast.success('Education added!')
//       }
//       setModal(false)
//       fetchEducations()
//     } catch (err) {
//       toast.error('Failed to save education')
//     } finally {
//       setSaving(false)
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm('Delete this education?')) return
//     try {
//       await axios.delete(API + '/education/' + id + '/', authHeaders())
//       toast.success('Education deleted!')
//       fetchEducations()
//     } catch (err) {
//       toast.error('Failed to delete education')
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
//         <FiPlus /> add_education()
//       </button>

//       {educations.length === 0 ? (
//         <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no education yet</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
//           {educations.map(function(edu) {
//             return (
//               <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
//                 <div style={{ flex: 1 }}>
//                   <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{edu.degree} in {edu.field}</p>
//                   <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{edu.institution} · {edu.start_year} - {edu.is_current ? 'Present' : edu.end_year}</p>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(edu)        }} title="Edit"   />
//                   <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(edu.id) }} title="Delete" color="#e74c3c" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {modal && (
//         <Modal title={editing ? 'Edit Education' : 'Add Education'} onClose={function() { setModal(false) }}>
//           <FormField label="institution" name="institution" value={form.institution || ''} onChange={handleChange} required placeholder="College / School name" />
//           <FormField label="degree"      name="degree"      value={form.degree      || ''} onChange={handleChange} required placeholder="e.g. B.Tech"          />
//           <FormField label="field"       name="field"       value={form.field       || ''} onChange={handleChange} required placeholder="e.g. Computer Science" />
//           <FormField label="start_year"  name="start_year"  value={form.start_year  || ''} onChange={handleChange} type="number" placeholder="2020"             />
//           <FormField label="end_year"    name="end_year"    value={form.end_year    || ''} onChange={handleChange} type="number" placeholder="2024"             />
//           <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <input type="checkbox" name="is_current" checked={form.is_current} onChange={handleChange} id="is_current_edu" />
//             <label htmlFor="is_current_edu" style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#1a1a2e', cursor: 'pointer' }}>Currently studying here</label>
//           </div>
//           <FormField label="grade" name="grade" value={form.grade || ''} onChange={handleChange} placeholder="e.g. 8.5 CGPA or 85%" />
//           <SaveBtn loading={saving} onClick={handleSave} />
//         </Modal>
//       )}
//     </div>
//   )
// }

// function CertificationsSection() {
//   const [certs,   setCerts]   = useState([])
//   const [loading, setLoading] = useState(true)
//   const [modal,   setModal]   = useState(false)
//   const [saving,  setSaving]  = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [certImage, setCertImage] = useState(null)
//   const [form,    setForm]    = useState({ title: '', issuer: '', issue_date: '', credential_url: '' })

//   function fetchCerts() {
//     axios.get(API + '/certification/')
//       .then(function(res) { setCerts(res.data); setLoading(false) })
//       .catch(function()   { setLoading(false) })
//   }

//   useEffect(function() { fetchCerts() }, [])

//   function handleChange(e) {
//     setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
//   }

//   function openAdd() {
//     setEditing(null)
//     setForm({ title: '', issuer: '', issue_date: '', credential_url: '' })
//     setCertImage(null)
//     setModal(true)
//   }

//   function openEdit(cert) {
//     setEditing(cert)
//     setForm(cert)
//     setCertImage(null)
//     setModal(true)
//   }

//   async function handleSave() {
//     if (!form.title) { toast.error('Title is required'); return }
//     try {
//       setSaving(true)
//       const formData = new FormData()
//       Object.keys(form).forEach(key => { formData.append(key, form[key]) })
//       if (certImage) formData.append('image', certImage)

//       if (editing) {
//         await axios.put(API + '/certification/' + editing.id + '/', formData, authHeaders())
//         toast.success('Certification updated!')
//       } else {
//         await axios.post(API + '/certification/', formData, authHeaders())
//         toast.success('Certification added!')
//       }
//       setModal(false)
//       setCertImage(null)
//       fetchCerts()
//     } catch (err) {
//       console.error(err)
//       toast.error('Failed to save certification')
//     } finally {
//       setSaving(false)
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm('Delete this certification?')) return
//     try {
//       await axios.delete(API + '/certification/' + id + '/', authHeaders())
//       toast.success('Certification deleted!')
//       fetchCerts()
//     } catch (err) {
//       toast.error('Failed to delete certification')
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
//         <FiPlus /> add_certification()
//       </button>

//       {certs.length === 0 ? (
//         <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no certifications yet</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
//           {certs.map(function(cert) {
//             return (
//               <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
//                 <div style={{ flex: 1 }}>
//                   <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{cert.title}</p>
//                   <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{cert.issuer} · {cert.issue_date}</p>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(cert)        }} title="Edit"   />
//                   <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(cert.id) }} title="Delete" color="#e74c3c" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {modal && (
//         <Modal title={editing ? 'Edit Certification' : 'Add Certification'} onClose={function() { setModal(false) }}>
//           <FormField label="title"          name="title"          value={form.title          || ''} onChange={handleChange} required placeholder="Certificate name"      />
//           <FormField label="issuer"         name="issuer"         value={form.issuer         || ''} onChange={handleChange} required placeholder="e.g. Google, Udemy"   />
//           <FormField label="issue_date"     name="issue_date"     value={form.issue_date     || ''} onChange={handleChange} type="date"                                  />
//           <FormField label="credential_url" name="credential_url" value={form.credential_url || ''} onChange={handleChange} placeholder="https://..."                   />
          
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>certificate image</label>
//             {editing?.image && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {editing.image.split('/').pop()}</p>}
//             <input type="file" accept="image/*" onChange={function(e) { setCertImage(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
//           </div>

//           <SaveBtn loading={saving} onClick={handleSave} />
//         </Modal>
//       )}
//     </div>
//   )
// }

// function LinksSection() {
//   const [links,   setLinks]   = useState([])
//   const [loading, setLoading] = useState(true)
//   const [modal,   setModal]   = useState(false)
//   const [saving,  setSaving]  = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [form,    setForm]    = useState({ name: '', url: '', icon: '' })

//   function fetchLinks() {
//     axios.get(API + '/links/')
//       .then(function(res) { setLinks(res.data); setLoading(false) })
//       .catch(function()   { setLoading(false) })
//   }

//   useEffect(function() { fetchLinks() }, [])

//   function handleChange(e) {
//     setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
//   }

//   function openAdd() {
//     setEditing(null)
//     setForm({ name: '', url: '', icon: '' })
//     setModal(true)
//   }

//   function openEdit(link) {
//     setEditing(link)
//     setForm(link)
//     setModal(true)
//   }

//   async function handleSave() {
//     if (!form.name || !form.url) { toast.error('Name and URL are required'); return }
//     try {
//       setSaving(true)
//       if (editing) {
//         await axios.put(API + '/links/' + editing.id + '/', form, authHeaders())
//         toast.success('Link updated!')
//       } else {
//         await axios.post(API + '/links/', form, authHeaders())
//         toast.success('Link added!')
//       }
//       setModal(false)
//       fetchLinks()
//     } catch (err) {
//       toast.error('Failed to save link')
//     } finally {
//       setSaving(false)
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm('Delete this link?')) return
//     try {
//       await axios.delete(API + '/links/' + id + '/', authHeaders())
//       toast.success('Link deleted!')
//       fetchLinks()
//     } catch (err) {
//       toast.error('Failed to delete link')
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
//         <FiPlus /> add_link()
//       </button>

//       <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb', fontSize: '11px', marginBottom: '1rem' }}>// icon options: FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiGlobe</p>

//       {links.length === 0 ? (
//         <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no links yet</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
//           {links.map(function(link) {
//             return (
//               <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
//                 <div style={{ flex: 1 }}>
//                   <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{link.name}</p>
//                   <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{link.url}</p>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(link)        }} title="Edit"   />
//                   <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(link.id) }} title="Delete" color="#e74c3c" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {modal && (
//         <Modal title={editing ? 'Edit Link' : 'Add Link'} onClose={function() { setModal(false) }}>
//           <FormField label="name"  name="name"  value={form.name  || ''} onChange={handleChange} required placeholder="e.g. GitHub"                />
//           <FormField label="url"   name="url"   value={form.url   || ''} onChange={handleChange} required placeholder="https://github.com/username" />
//           <FormField label="icon"  name="icon"  value={form.icon  || ''} onChange={handleChange} placeholder="e.g. FiGithub"                        />
//           <SaveBtn loading={saving} onClick={handleSave} />
//         </Modal>
//       )}
//     </div>
//   )
// }

// function MessagesSection() {
//   const [messages, setMessages] = useState([])
//   const [loading,  setLoading]  = useState(true)

//   function fetchMessages() {
//     axios.get(API + '/contact/', authHeaders())
//       .then(function(res) { setMessages(res.data); setLoading(false) })
//       .catch(function()   { setLoading(false) })
//   }

//   useEffect(function() { fetchMessages() }, [])

//   async function handleDelete(id) {
//     if (!window.confirm('Delete this message?')) return
//     try {
//       await axios.delete(API + '/contact/' + id + '/', authHeaders())
//       toast.success('Message deleted!')
//       fetchMessages()
//     } catch (err) {
//       toast.error('Failed to delete message')
//     }
//   }

//   if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

//   return (
//     <div>
//       {messages.length === 0 ? (
//         <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no messages yet</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           {messages.map(function(msg) {
//             return (
//               <div key={msg.id} style={{ padding: '1.2rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
//                   <div>
//                     <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{msg.name}</p>
//                     <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{msg.email} · {new Date(msg.created_at).toLocaleDateString('en-IN')}</p>
//                   </div>
//                   <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(msg.id) }} title="Delete" color="#e74c3c" />
//                 </div>
//                 <p style={{ color: '#6b6b8a', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{msg.message}</p>
//               </div>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }

// const TABS = [
//   { id: 'profile',       label: 'profile'       },
//   { id: 'projects',      label: 'projects'      },
//   { id: 'skills',        label: 'skills'        },
//   { id: 'experience',    label: 'experience'    },
//   { id: 'education',     label: 'education'     },
//   { id: 'certifications',label: 'certifications'},
//   { id: 'links',         label: 'links'         },
//   { id: 'messages',      label: 'messages'      },
// ]

// export default function Admin() {
//   const [activeTab, setActiveTab] = useState('profile')
//   const navigate                  = useNavigate()

//   useEffect(function() {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       toast.error('Please login first')
//       navigate('/login')
//     }
//   }, [navigate])

//   function handleLogout() {
//     localStorage.removeItem('token')
//     localStorage.removeItem('refresh')
//     localStorage.removeItem('username')
//     toast.success('Logged out!')
//     navigate('/login')
//   }

//   function renderSection() {
//     if (activeTab === 'profile')        return <ProfileSection        />
//     if (activeTab === 'projects')       return <ProjectsSection       />
//     if (activeTab === 'skills')         return <SkillsSection         />
//     if (activeTab === 'experience')     return <ExperienceSection     />
//     if (activeTab === 'education')      return <EducationSection      />
//     if (activeTab === 'certifications') return <CertificationsSection />
//     if (activeTab === 'links')          return <LinksSection          />
//     if (activeTab === 'messages')       return <MessagesSection       />
//     return null
//   }

//   return (
//     <div style={{
//       minHeight:  '100vh',
//       background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
//       paddingTop: '80px',
//     }}>
//       <div className="section">

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           style={{
//             display:        'flex',
//             justifyContent: 'space-between',
//             alignItems:     'center',
//             marginBottom:   '2rem',
//             flexWrap:       'wrap',
//             gap:            '1rem',
//           }}
//         >
//           <div>
//             <h2 style={{
//               fontFamily: 'Space Grotesk, sans-serif',
//               fontSize:   '1.8rem',
//               fontWeight: '700',
//               color:      '#1a1a2e',
//               margin:     0,
//             }}>
//               Admin Panel
//             </h2>
//             <p style={{
//               fontFamily: 'Fira Code, monospace',
//               color:      '#9999bb',
//               fontSize:   '0.8rem',
//               margin:     0,
//             }}>
//               // manage your portfolio content
//             </p>
//           </div>

//           <button
//             onClick={handleLogout}
//             style={{
//               display:      'flex',
//               alignItems:   'center',
//               gap:          '8px',
//               padding:      '8px 16px',
//               borderRadius: '8px',
//               border:       '1.5px solid #e74c3c',
//               background:   'transparent',
//               color:        '#e74c3c',
//               fontFamily:   'Fira Code, monospace',
//               fontSize:     '12px',
//               cursor:       'pointer',
//               transition:   'all 0.3s',
//             }}
//             onMouseOver={function(e) {
//               e.currentTarget.style.background = '#e74c3c'
//               e.currentTarget.style.color      = '#fff'
//             }}
//             onMouseOut={function(e) {
//               e.currentTarget.style.background = 'transparent'
//               e.currentTarget.style.color      = '#e74c3c'
//             }}
//           >
//             <FiLogOut /> logout()
//           </button>
//         </motion.div>

//         <div style={{
//           display:      'flex',
//           gap:          '0.3rem',
//           marginBottom: '2rem',
//           flexWrap:     'wrap',
//           background:   '#fff',
//           padding:      '0.5rem',
//           borderRadius: '12px',
//           border:       '1px solid #e0e0f0',
//         }}>
//           {TABS.map(function(tab) {
//             return (
//               <TabBtn
//                 key={tab.id}
//                 label={tab.label}
//                 active={activeTab === tab.id}
//                 onClick={function() { setActiveTab(tab.id) }}
//               />
//             )
//           })}
//         </div>

//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           style={{
//             background:   '#fff',
//             borderRadius: '16px',
//             padding:      '1.5rem',
//             border:       '1px solid #e0e0f0',
//             boxShadow:    '0 4px 24px rgba(0,0,0,0.06)',
//           }}
//         >
//           {renderSection()}
//         </motion.div>

//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
const API = import.meta.env.VITE_API_URL

function authHeaders() {
  const token = localStorage.getItem('token')
  return { headers: { Authorization: 'Bearer ' + token } }
}

function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:      '8px 16px',
        borderRadius: '8px',
        border:       'none',
        background:   active ? '#1a1a2e' : 'transparent',
        color:        active ? '#fff' : '#9999bb',
        fontFamily:   'Fira Code, monospace',
        fontSize:     '12px',
        cursor:       'pointer',
        transition:   'all 0.3s',
        whiteSpace:   'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function ActionBtn({ icon, color, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          '32px',
        height:         '32px',
        borderRadius:   '6px',
        border:         '1px solid #e0e0f0',
        background:     '#fff',
        color:          color || '#1a1a2e',
        cursor:         'pointer',
        transition:     'all 0.2s',
      }}
      onMouseOver={function(e) { e.currentTarget.style.background = '#f0f0f8' }}
      onMouseOut={function(e)  { e.currentTarget.style.background = '#fff'    }}
    >
      {icon}
    </button>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position:       'fixed',
      top:            0,
      left:           0,
      right:          0,
      bottom:         0,
      background:     'rgba(0,0,0,0.4)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      zIndex:         1000,
      padding:        '1rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background:   '#fff',
          borderRadius: '16px',
          padding:      '1.5rem',
          width:        '100%',
          maxWidth:     '500px',
          maxHeight:    '90vh',
          overflowY:    'auto',
          boxShadow:    '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginBottom:   '1.5rem',
        }}>
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize:   '1.1rem',
            fontWeight: '600',
            color:      '#1a1a2e',
            margin:     0,
          }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              color:          '#9999bb',
              fontSize:       '1.2rem',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            <FiX />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

function FormField({ label, name, value, onChange, type, required, placeholder }) {
  const inputStyle = {
    width:        '100%',
    padding:      '10px 14px',
    borderRadius: '8px',
    border:       '1.5px solid #e0e0f0',
    fontFamily:   'Fira Code, monospace',
    fontSize:     '13px',
    color:        '#1a1a2e',
    outline:      'none',
    boxSizing:    'border-box',
    marginBottom: '1rem',
    transition:   'border-color 0.3s',
  }

  return (
    <div>
      <label style={{
        fontFamily:   'Fira Code, monospace',
        fontSize:     '11px',
        color:        '#9999bb',
        display:      'block',
        marginBottom: '4px',
        letterSpacing:'0.5px',
      }}>
        {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={function(e) { e.target.style.borderColor = '#1a1a2e' }}
          onBlur={function(e)  { e.target.style.borderColor = '#e0e0f0' }}
        />
      ) : type === 'select' ? null : (
        <input
          type={type || 'text'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={function(e) { e.target.style.borderColor = '#1a1a2e' }}
          onBlur={function(e)  { e.target.style.borderColor = '#e0e0f0' }}
        />
      )}
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label style={{
        fontFamily:   'Fira Code, monospace',
        fontSize:     '11px',
        color:        '#9999bb',
        display:      'block',
        marginBottom: '4px',
        letterSpacing:'0.5px',
      }}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width:        '100%',
          padding:      '10px 14px',
          borderRadius: '8px',
          border:       '1.5px solid #e0e0f0',
          fontFamily:   'Fira Code, monospace',
          fontSize:     '13px',
          color:        '#1a1a2e',
          outline:      'none',
          boxSizing:    'border-box',
          marginBottom: '1rem',
          background:   '#fff',
          cursor:       'pointer',
        }}
      >
        {options.map(function(opt) {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

function SaveBtn({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width:        '100%',
        padding:      '12px',
        borderRadius: '8px',
        border:       'none',
        background:   loading ? '#9999bb' : '#1a1a2e',
        color:        '#fff',
        fontFamily:   'Fira Code, monospace',
        fontSize:     '13px',
        cursor:       loading ? 'not-allowed' : 'pointer',
        display:      'flex',
        alignItems:   'center',
        justifyContent:'center',
        gap:          '8px',
        marginTop:    '0.5rem',
      }}
    >
      <FiCheck /> {loading ? 'saving...' : 'save()'}
    </button>
  )
}

function ProfileSection() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [form,    setForm]    = useState({
    name: '', title: '', bio: '', email: '',
    phone: '', location: '',
    projects_count: '', experience_years: '',
    certifications_count: '', technologies_count: '',
  })
  const [avatar, setAvatar] = useState(null)
  const [resume, setResume] = useState(null)

  useEffect(function() {
    axios.get(API + '/userauth/profile/')
      .then(function(res) {
        if (res.data.length > 0) {
          setProfile(res.data[0])
          setForm(res.data[0])
        }
        setLoading(false)
      })
      .catch(function() { setLoading(false) })
  }, [])

  function handleChange(e) {
    setForm(function(prev) {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function handleSave() {
    try {
      setSaving(true)
      const formData = new FormData()
      Object.keys(form).forEach(key => {
        formData.append(key, form[key])
      })
      if (avatar) formData.append('avatar', avatar)
      if (resume) formData.append('resume', resume)

      if (profile) {
        await axios.put(API + '/userauth/profile/' + profile.id + '/', formData, authHeaders())
        toast.success('Profile updated!')
      } else {
        const res = await axios.post(API + '/userauth/profile/', formData, authHeaders())
        setProfile(res.data)
        toast.success('Profile created!')
      }
      setAvatar(null)
      setResume(null)
    } catch (err) {
      console.error(err)
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 1rem' }}>
        <FormField label="name"     name="name"     value={form.name     || ''} onChange={handleChange} required placeholder="Your full name"  />
        <FormField label="title"    name="title"    value={form.title    || ''} onChange={handleChange} required placeholder="Your job title"   />
        <FormField label="email"    name="email"    value={form.email    || ''} onChange={handleChange} type="email" placeholder="your@email.com" />
        <FormField label="phone"    name="phone"    value={form.phone    || ''} onChange={handleChange} placeholder="+91 XXXXXXXXXX"             />
        <FormField label="location" name="location" value={form.location || ''} onChange={handleChange} placeholder="City, Country"             />
      </div>
      <Helmet>
        <title>Admin - Roshan Sharma </title>
    </Helmet>
      <FormField label="bio" name="bio" value={form.bio || ''} onChange={handleChange} type="textarea" placeholder="Write something about yourself..." />

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>avatar (profile picture)</label>
        {profile?.avatar && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {profile.avatar.split('/').pop()}</p>}
        <input type="file" accept="image/*" onChange={function(e) { setAvatar(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>resume (PDF)</label>
        {profile?.resume && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {profile.resume.split('/').pop()}</p>}
        <input type="file" accept=".pdf,.doc,.docx" onChange={function(e) { setResume(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
      </div>

      <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb', fontSize: '11px', marginBottom: '0.8rem' }}>// stats shown on home page</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0 1rem' }}>
        <FormField label="projects_count"       name="projects_count"       value={form.projects_count       || ''} onChange={handleChange} placeholder="10+" />
        <FormField label="experience_years"     name="experience_years"     value={form.experience_years     || ''} onChange={handleChange} placeholder="2+"  />
        <FormField label="certifications_count" name="certifications_count" value={form.certifications_count || ''} onChange={handleChange} placeholder="5+"  />
        <FormField label="technologies_count"   name="technologies_count"   value={form.technologies_count   || ''} onChange={handleChange} placeholder="3+"  />
      </div>

      <SaveBtn loading={saving} onClick={handleSave} />
    </div>
  )
}

function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [form,     setForm]     = useState({
    title: '', description: '', tech_stack: '',
    github_url: '', live_url: '', status: 'completed',
  })

  function fetchProjects() {
    axios.get(API + '/projects/')
      .then(function(res) { setProjects(res.data); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }

  useEffect(function() { fetchProjects() }, [])

  function handleChange(e) {
    setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
  }

  function openAdd() {
    setEditing(null)
    setForm({ title: '', description: '', tech_stack: '', github_url: '', live_url: '', status: 'completed' })
    setThumbnail(null)
    setModal(true)
  }

  function openEdit(project) {
    setEditing(project)
    setForm(project)
    setThumbnail(null)
    setModal(true)
  }

  async function handleSave() {
    if (!form.title) { toast.error('Title is required'); return }
    try {
      setSaving(true)
      const formData = new FormData()
      Object.keys(form).forEach(key => { formData.append(key, form[key]) })
      if (thumbnail) formData.append('thumbnail', thumbnail)

      if (editing) {
        await axios.put(API + '/projects/' + editing.id + '/', formData, authHeaders())
        toast.success('Project updated!')
      } else {
        await axios.post(API + '/projects/', formData, authHeaders())
        toast.success('Project added!')
      }
      setModal(false)
      setThumbnail(null)
      fetchProjects()
    } catch (err) {
      console.error(err)
      toast.error('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return
    try {
      await axios.delete(API + '/projects/' + id + '/', authHeaders())
      toast.success('Project deleted!')
      fetchProjects()
    } catch (err) {
      toast.error('Failed to delete project')
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <FiPlus /> add_project()
      </button>

      {projects.length === 0 ? (
        <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb', fontSize: '0.9rem' }}>no projects yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {projects.map(function(project) {
            return (
              <div key={project.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</p>
                  <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{project.status} · {project.tech_stack}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(project)       }} title="Edit"   />
                  <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(project.id)}} title="Delete" color="#e74c3c" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <Modal title={editing ? 'Edit Project' : 'Add Project'} onClose={function() { setModal(false) }}>
          <FormField label="title"       name="title"       value={form.title       || ''} onChange={handleChange} required placeholder="Project title"       />
          <FormField label="description" name="description" value={form.description || ''} onChange={handleChange} type="textarea" placeholder="Project description" />
          <FormField label="tech_stack"  name="tech_stack"  value={form.tech_stack  || ''} onChange={handleChange} placeholder="React, Django, PostgreSQL"    />
          <FormField label="github_url"  name="github_url"  value={form.github_url  || ''} onChange={handleChange} placeholder="https://github.com/..."       />
          <FormField label="live_url"    name="live_url"    value={form.live_url    || ''} onChange={handleChange} placeholder="https://..."                   />
          <SelectField label="status" name="status" value={form.status} onChange={handleChange} options={[ { value: 'completed', label: 'Completed' }, { value: 'ongoing',   label: 'Ongoing'   } ]} />
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>thumbnail (project screenshot)</label>
            {editing?.thumbnail && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {editing.thumbnail.split('/').pop()}</p>}
            <input type="file" accept="image/*" onChange={function(e) { setThumbnail(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
          </div>

          <SaveBtn loading={saving} onClick={handleSave} />
        </Modal>
      )}
    </div>
  )
}

function SkillsSection() {
  const [skills,  setSkills]  = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState({ name: '', category: 'other', level: 'intermediate', icon: '' })

  function fetchSkills() {
    axios.get(API + '/skills/')
      .then(function(res) { setSkills(res.data); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }

  useEffect(function() { fetchSkills() }, [])

  function handleChange(e) {
    setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
  }

  function openAdd() {
    setEditing(null)
    setForm({ name: '', category: 'other', level: 'intermediate', icon: '' })
    setModal(true)
  }

  function openEdit(skill) {
    setEditing(skill)
    setForm(skill)
    setModal(true)
  }

  async function handleSave() {
    if (!form.name) { toast.error('Name is required'); return }
    try {
      setSaving(true)
      if (editing) {
        await axios.put(API + '/skills/' + editing.id + '/', form, authHeaders())
        toast.success('Skill updated!')
      } else {
        await axios.post(API + '/skills/', form, authHeaders())
        toast.success('Skill added!')
      }
      setModal(false)
      fetchSkills()
    } catch (err) {
      toast.error('Failed to save skill')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this skill?')) return
    try {
      await axios.delete(API + '/skills/' + id + '/', authHeaders())
      toast.success('Skill deleted!')
      fetchSkills()
    } catch (err) {
      toast.error('Failed to delete skill')
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <FiPlus /> add_skill()
      </button>

      {skills.length === 0 ? (
        <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no skills yet</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
          {skills.map(function(skill) {
            return (
              <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0f0' }}>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', color: '#1a1a2e' }}>{skill.name}</span>
                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#9999bb' }}>{skill.category} · {skill.level}</span>
                <ActionBtn icon={<FiEdit2 size={12} />}  onClick={function() { openEdit(skill)        }} title="Edit"   />
                <ActionBtn icon={<FiTrash2 size={12} />} onClick={function() { handleDelete(skill.id) }} title="Delete" color="#e74c3c" />
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <Modal title={editing ? 'Edit Skill' : 'Add Skill'} onClose={function() { setModal(false) }}>
          <FormField label="name"  name="name"  value={form.name  || ''} onChange={handleChange} required placeholder="e.g. React"    />
          <SelectField label="category" name="category" value={form.category || 'other'} onChange={handleChange} options={[ { value: 'language', label: 'Languages' }, { value: 'framework', label: 'Frameworks' }, { value: 'database', label: 'Databases' }, { value: 'tools', label: 'Tools' }, { value: 'other', label: 'Other' } ]} />
          <SelectField label="level" name="level" value={form.level} onChange={handleChange} options={[ { value: 'beginner',     label: 'Beginner'     }, { value: 'intermediate', label: 'Intermediate' }, { value: 'expert',       label: 'Expert'       } ]} />
          <SaveBtn loading={saving} onClick={handleSave} />
        </Modal>
      )}
    </div>
  )
}

function ExperienceSection() {
  const [experiences, setExperiences] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [modal,       setModal]       = useState(false)
  const [saving,      setSaving]      = useState(false)
  const [editing,     setEditing]     = useState(null)
  const [form,        setForm]        = useState({ company: '', role: '', location: '', start_date: '', end_date: '', is_current: false, description: '' })

  function fetchExperiences() {
    axios.get(API + '/experience/')
      .then(function(res) { setExperiences(res.data); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }

  useEffect(function() { fetchExperiences() }, [])

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(function(prev) {
      const next = { ...prev, [e.target.name]: value }
      // end_date must be null (not an empty string) when marked as current,
      // otherwise Django's DateField rejects "" and the whole save fails silently.
      if (e.target.name === 'is_current' && value === true) {
        next.end_date = null
      }
      return next
    })
  }

  function openAdd() {
    setEditing(null)
    setForm({ company: '', role: '', location: '', start_date: '', end_date: '', is_current: false, description: '' })
    setModal(true)
  }

  function openEdit(exp) {
    setEditing(exp)
    setForm(exp)
    setModal(true)
  }

  async function handleSave() {
    if (!form.company || !form.role) { toast.error('Company and role are required'); return }
    try {
      setSaving(true)
      const payload = { ...form, end_date: form.is_current ? null : (form.end_date || null) }
      if (editing) {
        await axios.put(API + '/experience/' + editing.id + '/', payload, authHeaders())
        toast.success('Experience updated!')
      } else {
        await axios.post(API + '/experience/', payload, authHeaders())
        toast.success('Experience added!')
      }
      setModal(false)
      fetchExperiences()
    } catch (err) {
      toast.error('Failed to save experience')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this experience?')) return
    try {
      await axios.delete(API + '/experience/' + id + '/', authHeaders())
      toast.success('Experience deleted!')
      fetchExperiences()
    } catch (err) {
      toast.error('Failed to delete experience')
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <FiPlus /> add_experience()
      </button>

      {experiences.length === 0 ? (
        <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no experience yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {experiences.map(function(exp) {
            return (
              <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{exp.role}</p>
                  <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{exp.company} {exp.is_current ? '· current' : ''}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(exp)        }} title="Edit"   />
                  <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(exp.id) }} title="Delete" color="#e74c3c" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <Modal title={editing ? 'Edit Experience' : 'Add Experience'} onClose={function() { setModal(false) }}>
          <FormField label="company"    name="company"    value={form.company    || ''} onChange={handleChange} required placeholder="Company name"  />
          <FormField label="role"       name="role"       value={form.role       || ''} onChange={handleChange} required placeholder="Your job title" />
          <FormField label="location"   name="location"   value={form.location   || ''} onChange={handleChange} placeholder="City, Country"          />
          <FormField label="start_date" name="start_date" value={form.start_date || ''} onChange={handleChange} type="date" />
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" name="is_current" checked={form.is_current} onChange={handleChange} id="is_current" />
            <label htmlFor="is_current" style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#1a1a2e', cursor: 'pointer' }}>Currently working here</label>
          </div>
          {!form.is_current && (
            <FormField label="end_date" name="end_date" value={form.end_date || ''} onChange={handleChange} type="date" />
          )}
          <FormField label="description" name="description" value={form.description || ''} onChange={handleChange} type="textarea" placeholder="Describe your role..." />
          <SaveBtn loading={saving} onClick={handleSave} />
        </Modal>
      )}
    </div>
  )
}

function EducationSection() {
  const [educations, setEducations] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [modal,      setModal]      = useState(false)
  const [saving,     setSaving]     = useState(false)
  const [editing,    setEditing]    = useState(null)
  const [form,       setForm]       = useState({ institution: '', degree: '', field: '', start_year: '', end_year: '', is_current: false, grade: '' })

  function fetchEducations() {
    axios.get(API + '/education/')
      .then(function(res) { setEducations(res.data); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }

  useEffect(function() { fetchEducations() }, [])

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(function(prev) {
      const next = { ...prev, [e.target.name]: value }
      // end_year must be null (not an empty string) when marked as current,
      // otherwise Django's IntegerField rejects "" and the whole save fails silently.
      if (e.target.name === 'is_current' && value === true) {
        next.end_year = null
      }
      return next
    })
  }

  function openAdd() {
    setEditing(null)
    setForm({ institution: '', degree: '', field: '', start_year: '', end_year: '', is_current: false, grade: '' })
    setModal(true)
  }

  function openEdit(edu) {
    setEditing(edu)
    setForm(edu)
    setModal(true)
  }

  async function handleSave() {
    if (!form.institution) { toast.error('Institution is required'); return }
    try {
      setSaving(true)
      const payload = { ...form, end_year: form.is_current ? null : (form.end_year || null) }
      if (editing) {
        await axios.put(API + '/education/' + editing.id + '/', payload, authHeaders())
        toast.success('Education updated!')
      } else {
        await axios.post(API + '/education/', payload, authHeaders())
        toast.success('Education added!')
      }
      setModal(false)
      fetchEducations()
    } catch (err) {
      toast.error('Failed to save education')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this education?')) return
    try {
      await axios.delete(API + '/education/' + id + '/', authHeaders())
      toast.success('Education deleted!')
      fetchEducations()
    } catch (err) {
      toast.error('Failed to delete education')
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <FiPlus /> add_education()
      </button>

      {educations.length === 0 ? (
        <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no education yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {educations.map(function(edu) {
            return (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{edu.degree} in {edu.field}</p>
                  <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{edu.institution} · {edu.start_year} - {edu.is_current ? 'Present' : edu.end_year}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(edu)        }} title="Edit"   />
                  <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(edu.id) }} title="Delete" color="#e74c3c" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <Modal title={editing ? 'Edit Education' : 'Add Education'} onClose={function() { setModal(false) }}>
          <FormField label="institution" name="institution" value={form.institution || ''} onChange={handleChange} required placeholder="College / School name" />
          <FormField label="degree"      name="degree"      value={form.degree      || ''} onChange={handleChange} required placeholder="e.g. B.Tech"          />
          <FormField label="field"       name="field"       value={form.field       || ''} onChange={handleChange} required placeholder="e.g. Computer Science" />
          <FormField label="start_year"  name="start_year"  value={form.start_year  || ''} onChange={handleChange} type="number" placeholder="2020"             />
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" name="is_current" checked={form.is_current} onChange={handleChange} id="is_current_edu" />
            <label htmlFor="is_current_edu" style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#1a1a2e', cursor: 'pointer' }}>Currently studying here</label>
          </div>
          {!form.is_current && (
            <FormField label="end_year" name="end_year" value={form.end_year || ''} onChange={handleChange} type="number" placeholder="2024" />
          )}
          <FormField label="grade" name="grade" value={form.grade || ''} onChange={handleChange} placeholder="e.g. 8.5 CGPA or 85%" />
          <SaveBtn loading={saving} onClick={handleSave} />
        </Modal>
      )}
    </div>
  )
}

function CertificationsSection() {
  const [certs,   setCerts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [editing, setEditing] = useState(null)
  const [certImage, setCertImage] = useState(null)
  const [form,    setForm]    = useState({ title: '', issuer: '', issue_date: '', credential_url: '' })

  function fetchCerts() {
    axios.get(API + '/certification/')
      .then(function(res) { setCerts(res.data); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }

  useEffect(function() { fetchCerts() }, [])

  function handleChange(e) {
    setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
  }

  function openAdd() {
    setEditing(null)
    setForm({ title: '', issuer: '', issue_date: '', credential_url: '' })
    setCertImage(null)
    setModal(true)
  }

  function openEdit(cert) {
    setEditing(cert)
    setForm(cert)
    setCertImage(null)
    setModal(true)
  }

  async function handleSave() {
    if (!form.title) { toast.error('Title is required'); return }
    try {
      setSaving(true)
      const formData = new FormData()
      Object.keys(form).forEach(key => { formData.append(key, form[key]) })
      if (certImage) formData.append('image', certImage)

      if (editing) {
        await axios.put(API + '/certification/' + editing.id + '/', formData, authHeaders())
        toast.success('Certification updated!')
      } else {
        await axios.post(API + '/certification/', formData, authHeaders())
        toast.success('Certification added!')
      }
      setModal(false)
      setCertImage(null)
      fetchCerts()
    } catch (err) {
      console.error(err)
      toast.error('Failed to save certification')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this certification?')) return
    try {
      await axios.delete(API + '/certification/' + id + '/', authHeaders())
      toast.success('Certification deleted!')
      fetchCerts()
    } catch (err) {
      toast.error('Failed to delete certification')
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <FiPlus /> add_certification()
      </button>

      {certs.length === 0 ? (
        <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no certifications yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {certs.map(function(cert) {
            return (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{cert.title}</p>
                  <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{cert.issuer} · {cert.issue_date}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(cert)        }} title="Edit"   />
                  <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(cert.id) }} title="Delete" color="#e74c3c" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <Modal title={editing ? 'Edit Certification' : 'Add Certification'} onClose={function() { setModal(false) }}>
          <FormField label="title"          name="title"          value={form.title          || ''} onChange={handleChange} required placeholder="Certificate name"      />
          <FormField label="issuer"         name="issuer"         value={form.issuer         || ''} onChange={handleChange} required placeholder="e.g. Google, Udemy"   />
          <FormField label="issue_date"     name="issue_date"     value={form.issue_date     || ''} onChange={handleChange} type="date"                                  />
          <FormField label="credential_url" name="credential_url" value={form.credential_url || ''} onChange={handleChange} placeholder="https://..."                   />
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', display: 'block', marginBottom: '6px' }}>certificate image</label>
            {editing?.image && <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4a4a6a', marginBottom: '8px' }}>Current: {editing.image.split('/').pop()}</p>}
            <input type="file" accept="image/*" onChange={function(e) { setCertImage(e.target.files[0]) }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e0e0f0', fontSize: '13px', fontFamily: 'Fira Code, monospace' }} />
          </div>

          <SaveBtn loading={saving} onClick={handleSave} />
        </Modal>
      )}
    </div>
  )
}

function LinksSection() {
  const [links,   setLinks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState({ name: '', url: '', icon: '' })

  function fetchLinks() {
    axios.get(API + '/links/')
      .then(function(res) { setLinks(res.data); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }

  useEffect(function() { fetchLinks() }, [])

  function handleChange(e) {
    setForm(function(prev) { return { ...prev, [e.target.name]: e.target.value } })
  }

  function openAdd() {
    setEditing(null)
    setForm({ name: '', url: '', icon: '' })
    setModal(true)
  }

  function openEdit(link) {
    setEditing(link)
    setForm(link)
    setModal(true)
  }

  async function handleSave() {
    if (!form.name || !form.url) { toast.error('Name and URL are required'); return }
    try {
      setSaving(true)
      if (editing) {
        await axios.put(API + '/links/' + editing.id + '/', form, authHeaders())
        toast.success('Link updated!')
      } else {
        await axios.post(API + '/links/', form, authHeaders())
        toast.success('Link added!')
      }
      setModal(false)
      fetchLinks()
    } catch (err) {
      toast.error('Failed to save link')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this link?')) return
    try {
      await axios.delete(API + '/links/' + id + '/', authHeaders())
      toast.success('Link deleted!')
      fetchLinks()
    } catch (err) {
      toast.error('Failed to delete link')
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #1a1a2e', background: '#1a1a2e', color: '#fff', fontFamily: 'Fira Code, monospace', fontSize: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
        <FiPlus /> add_link()
      </button>

      <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb', fontSize: '11px', marginBottom: '1rem' }}>// icon options: FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiGlobe</p>

      {links.length === 0 ? (
        <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no links yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {links.map(function(link) {
            return (
              <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{link.name}</p>
                  <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{link.url}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ActionBtn icon={<FiEdit2 size={14} />}  onClick={function() { openEdit(link)        }} title="Edit"   />
                  <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(link.id) }} title="Delete" color="#e74c3c" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <Modal title={editing ? 'Edit Link' : 'Add Link'} onClose={function() { setModal(false) }}>
          <FormField label="name"  name="name"  value={form.name  || ''} onChange={handleChange} required placeholder="e.g. GitHub"                />
          <FormField label="url"   name="url"   value={form.url   || ''} onChange={handleChange} required placeholder="https://github.com/username" />
          <FormField label="icon"  name="icon"  value={form.icon  || ''} onChange={handleChange} placeholder="e.g. FiGithub"                        />
          <SaveBtn loading={saving} onClick={handleSave} />
        </Modal>
      )}
    </div>
  )
}

function MessagesSection() {
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(true)

  function fetchMessages() {
    axios.get(API + '/contact/', authHeaders())
      .then(function(res) { setMessages(res.data); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }

  useEffect(function() { fetchMessages() }, [])

  async function handleDelete(id) {
    if (!window.confirm('Delete this message?')) return
    try {
      await axios.delete(API + '/contact/' + id + '/', authHeaders())
      toast.success('Message deleted!')
      fetchMessages()
    } catch (err) {
      toast.error('Failed to delete message')
    }
  }

  if (loading) return <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>

  return (
    <div>
      {messages.length === 0 ? (
        <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>no messages yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(function(msg) {
            return (
              <div key={msg.id} style={{ padding: '1.2rem', background: '#fff', borderRadius: '10px', border: '1px solid #e0e0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <div>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', color: '#1a1a2e', margin: 0, marginBottom: '0.2rem' }}>{msg.name}</p>
                    <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9999bb', margin: 0 }}>{msg.email} · {new Date(msg.created_at).toLocaleDateString('en-IN')}</p>
                  </div>
                  <ActionBtn icon={<FiTrash2 size={14} />} onClick={function() { handleDelete(msg.id) }} title="Delete" color="#e74c3c" />
                </div>
                <p style={{ color: '#6b6b8a', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{msg.message}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const TABS = [
  { id: 'profile',       label: 'profile'       },
  { id: 'projects',      label: 'projects'      },
  { id: 'skills',        label: 'skills'        },
  { id: 'experience',    label: 'experience'    },
  { id: 'education',     label: 'education'     },
  { id: 'certifications',label: 'certifications'},
  { id: 'links',         label: 'links'         },
  { id: 'messages',      label: 'messages'      },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('profile')
  const navigate                  = useNavigate()

  useEffect(function() {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please login first')
      navigate('/login')
    }
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    localStorage.removeItem('username')
    toast.success('Logged out!')
    navigate('/login')
  }

  function renderSection() {
    if (activeTab === 'profile')        return <ProfileSection        />
    if (activeTab === 'projects')       return <ProjectsSection       />
    if (activeTab === 'skills')         return <SkillsSection         />
    if (activeTab === 'experience')     return <ExperienceSection     />
    if (activeTab === 'education')      return <EducationSection      />
    if (activeTab === 'certifications') return <CertificationsSection />
    if (activeTab === 'links')          return <LinksSection          />
    if (activeTab === 'messages')       return <MessagesSection       />
    return null
  }

  return (
    <div style={{
      minHeight:  '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      paddingTop: '80px',
    }}>
      <div className="section">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginBottom:   '2rem',
            flexWrap:       'wrap',
            gap:            '1rem',
          }}
        >
          <div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize:   '1.8rem',
              fontWeight: '700',
              color:      '#1a1a2e',
              margin:     0,
            }}>
              Admin Panel
            </h2>
            <p style={{
              fontFamily: 'Fira Code, monospace',
              color:      '#9999bb',
              fontSize:   '0.8rem',
              margin:     0,
            }}>
              // manage your portfolio content
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '8px',
              padding:      '8px 16px',
              borderRadius: '8px',
              border:       '1.5px solid #e74c3c',
              background:   'transparent',
              color:        '#e74c3c',
              fontFamily:   'Fira Code, monospace',
              fontSize:     '12px',
              cursor:       'pointer',
              transition:   'all 0.3s',
            }}
            onMouseOver={function(e) {
              e.currentTarget.style.background = '#e74c3c'
              e.currentTarget.style.color      = '#fff'
            }}
            onMouseOut={function(e) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color      = '#e74c3c'
            }}
          >
            <FiLogOut /> logout()
          </button>
        </motion.div>

        <div style={{
          display:      'flex',
          gap:          '0.3rem',
          marginBottom: '2rem',
          flexWrap:     'wrap',
          background:   '#fff',
          padding:      '0.5rem',
          borderRadius: '12px',
          border:       '1px solid #e0e0f0',
        }}>
          {TABS.map(function(tab) {
            return (
              <TabBtn
                key={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                onClick={function() { setActiveTab(tab.id) }}
              />
            )
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:   '#fff',
            borderRadius: '16px',
            padding:      '1.5rem',
            border:       '1px solid #e0e0f0',
            boxShadow:    '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {renderSection()}
        </motion.div>

      </div>
    </div>
  )
}