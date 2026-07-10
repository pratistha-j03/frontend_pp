import { useState, useEffect } from 'react';
import { fetchBanners, uploadBannerImage, deleteBannerImage, fetchServices, createService, deleteService, fetchContactMessages, sendContactMessage, markContactMessageRead, deleteContactMessage, fetchAdmins, createAdminUser, deleteAdminUser } from '../api.js';
import { useNavigate } from 'react-router-dom';

const Dialog = ({ dialog, onConfirm, onClose }) => {
  if (!dialog.open) return null;

  const icons = {
    confirm: { bg: 'bg-red-100', text: 'text-red-600', symbol: '!' },
    success: { bg: 'bg-green-100', text: 'text-green-600', symbol: '✓' },
    error: { bg: 'bg-red-100', text: 'text-red-600', symbol: '✕' },
  };
  const icon = icons[dialog.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
        <div className="flex items-start gap-3 mb-5">
          <div className={`w-9 h-9 rounded-full ${icon.bg} flex items-center justify-center flex-shrink-0`}>
            <span className={`${icon.text} text-lg font-bold`}>{icon.symbol}</span>
          </div>
          <div>
            <h3 className="font-bold text-[#021335] text-base">{dialog.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{dialog.message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {dialog.type === 'confirm' ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#1A49C9] hover:bg-blue-800 transition-colors"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TABS = ['Banners', 'Services', 'Messages'];

const AdminPanel = () => {

  const navigate = useNavigate();
  const currentAdmin = JSON.parse(localStorage.getItem('pp_admin_user') || 'null');
  const [activeTab, setActiveTab] = useState('Banners');
  const [bannerImages, setBannerImages] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);

  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const [admins, setAdmins] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [dialog, setDialog] = useState({ open: false, type: '', title: '', message: '', onConfirm: null });

  const showConfirm = (title, message, onConfirm) =>
    setDialog({ open: true, type: 'confirm', title, message, onConfirm });
  const showSuccess = (title, message) =>
    setDialog({ open: true, type: 'success', title, message, onConfirm: null });
  const showError = (title, message) =>
    setDialog({ open: true, type: 'error', title, message, onConfirm: null });
  const closeDialog = () =>
    setDialog({ open: false, type: '', title: '', message: '', onConfirm: null });

  const loadMessages = () => {
    fetchContactMessages()
      .then(data => Array.isArray(data) && setMessages(data))
      .catch(err => console.error("Could not fetch contact messages:", err));
  };

  const loadAdmins = () => {
    fetchAdmins()
      .then(data => Array.isArray(data) && setAdmins(data))
      .catch(err => console.error("Could not fetch admins:", err));
  };


  useEffect(() => {
    fetchBanners().then(data => data?.images && setBannerImages(data.images));
    fetchServices().then(data => Array.isArray(data) && setServices(data));
    loadMessages();
    loadAdmins();
  }, []);

  const handleBannerUpload = async (e) => {
    e.preventDefault();
    if (!bannerFile) return showError('No file selected', 'Please select an image before uploading.');

    const formData = new FormData();
    formData.append('bannerImage', bannerFile);

    const data = await uploadBannerImage(formData);
    if (data?.images) {
      setBannerImages(data.images);
      setBannerFile(null);
      showSuccess('Banner uploaded', 'The new banner image has been added successfully.');
    } else {
      showError('Upload failed', data?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleDeleteBanner = (index) => {
    showConfirm(
      'Remove banner?',
      'This banner image will be permanently removed.',
      async () => {
        closeDialog();
        const data = await deleteBannerImage(index);
        if (data?.images) {
          setBannerImages(data.images);
        } else {
          showError('Delete failed', data?.error || 'Could not remove the banner.');
        }
      }
    );
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!title || !description) return showError('Missing fields', 'Title and description are required.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) formData.append('imageFile', imageFile);

    const created = await createService(formData);
    if (created?._id) {
      setServices([...services, created]);
      setTitle('');
      setDescription('');
      setImageFile(null);
      showSuccess('Service added', `"${created.title}" has been added successfully.`);
    } else {
      showError('Failed to add service', created?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleDeleteService = (id, name) => {
    showConfirm(
      `Remove "${name}"?`,
      'This service will be permanently deleted.',
      async () => {
        closeDialog();
        const res = await deleteService(id);
        if (res.success) {
          setServices(services.filter(s => s._id !== id));
        } else {
          showError('Delete failed', res?.error || 'Could not remove the service.');
        }
      }
    );
  };

  const handleToggleMessage = async (msg) => {
    const willOpen = expandedMessageId !== msg._id;
    setExpandedMessageId(willOpen ? msg._id : null);

    if (willOpen && !msg.isRead) {
      const updated = await markContactMessageRead(msg._id);
      if (updated?._id) {
        setMessages(messages.map(m => (m._id === updated._id ? updated : m)));
      }
    }
  };

  const handleDeleteMessage = (id, name) => {
    showConfirm(
      `Delete message from "${name}"?`,
      'This message will be permanently deleted.',
      async () => {
        closeDialog();
        const res = await deleteContactMessage(id);
        if (res.success) {
          setMessages(messages.filter(m => m._id !== id));
          if (expandedMessageId === id) setExpandedMessageId(null);
        } else {
          showError('Delete failed', res?.error || 'Could not remove the message.');
        }
      }
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('pp_admin_token');
    localStorage.removeItem('pp_admin_user');
    navigate('/admin/login');
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!adminName || !adminEmail || !adminPassword) {
      return showError('Missing fields', 'Name, email and password are all required.');
    }
    if (adminPassword.length < 6) {
      return showError('Weak password', 'Password must be at least 6 characters.');
    }

    const created = await createAdminUser({ name: adminName, email: adminEmail, password: adminPassword });
    if (created?.id) {
      setAdmins([created, ...admins]);
      setAdminName('');
      setAdminEmail('');
      setAdminPassword('');
      showSuccess('Admin added', `${created.name} can now sign in.`);
    } else {
      showError('Failed to add admin', created?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleDeleteAdmin = (id, name) => {
    showConfirm(
      `Remove "${name}"?`,
      'This admin will no longer be able to sign in.',
      async () => {
        closeDialog();
        const res = await deleteAdminUser(id);
        if (res.success) {
          setAdmins(admins.filter(a => a._id !== id));
        } else {
          showError('Delete failed', res?.error || 'Could not remove this admin.');
        }
      }
    );
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };
  const tabConfig = [
    { key: 'banners', label: 'Hero Banners' },
    { key: 'services', label: 'Services' },
    {
      key: 'messages',
      label: 'Messages',
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { key: 'admins', label: 'Admins' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-slate-800">

      <Dialog dialog={dialog} onConfirm={dialog.onConfirm} onClose={closeDialog} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-[#021335]">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          {currentAdmin?.name && (
            <span className="text-sm text-gray-500">Signed in as <span className="font-bold text-[#021335]">{currentAdmin.name}</span></span>
          )}
          <button
            onClick={handleLogout}
            className="bg-slate-100 hover:bg-slate-200 text-[#021335] px-4 py-2 rounded-xl font-bold text-sm transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="flex gap-2 mb-8 border-b border-slate-200">
        {tabConfig.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-t-xl transition-colors duration-150
              ${activeTab === tab.key
                ? 'bg-white border border-b-white border-slate-200 text-[#1A49C9] -mb-px'
                : 'text-slate-500 hover:text-[#1A49C9] hover:bg-slate-50'
              }`}
          >
            {tab.label}
            {tab.badge && (
              <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Hero Banner Section */}
      {activeTab === 'banners' && (
        <div className="bg-slate-50 border p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#1A49C9]">Hero Banners</h2>
          <form onSubmit={handleBannerUpload} className="flex gap-4 items-center">
            <input
              type="file" accept="image/*"
              onChange={e => setBannerFile(e.target.files[0])}
              className="border p-2 bg-white rounded-xl text-sm"
            />
            <button type="submit" className="bg-[#1A49C9] text-white px-5 py-2 rounded-xl font-bold text-sm">
              Upload
            </button>
          </form>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {bannerImages.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="Banner Preview" className="h-24 w-full object-cover rounded-xl border bg-white" />
                <button
                  onClick={() => handleDeleteBanner(i)}
                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-lg"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'services' && (
        <div className="bg-slate-50 border p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-[#1A49C9]">Manage Services</h2>
          <form onSubmit={handleCreateService} className="grid md:grid-cols-3 gap-4 items-end bg-white p-4 rounded-xl border">

            <div>
              <label className="block text-xs font-bold mb-1">Service Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. Card Printing" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Description</label>
              <input type="text" required value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. High quality prints..." />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Upload Card Display Image</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full border p-1 text-xs bg-slate-50 rounded-lg" />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button type="submit" className="bg-[#1A49C9] text-white px-6 py-2 rounded-xl font-bold text-sm">
                Add Service
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-2">
            {services.length === 0 && (
              <p className="text-sm text-gray-500 bg-white p-4 rounded-xl border text-center">No services added yet.</p>
            )}
            {services.map((s) => (
              <div key={s._id} className="flex justify-between items-center bg-white p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-bold text-[#021335]">{s.title}</h4>
                    <p className="text-xs text-gray-500">{s.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteService(s._id, s.title)}
                  className="text-red-600 font-bold text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="bg-slate-50 border p-6 rounded-2xl mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1A49C9] flex items-center gap-2">
              Contact Messages
              {unreadCount > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h2>
            <button
              onClick={loadMessages}
              className="text-sm font-bold text-[#1A49C9] hover:underline"
            >
              Refresh
            </button>
          </div>

          {messages.length === 0 ? (
            <p className="text-sm text-gray-500 bg-white p-4 rounded-xl border text-center">
              No messages yet.
            </p>
          ) : (
            <div className="space-y-2">
              {messages.map((m) => (
                <div key={m._id} className="bg-white rounded-xl border overflow-hidden">
                  <button
                    onClick={() => handleToggleMessage(m)}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {!m.isRead && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1A49C9] flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <h4 className={`text-sm truncate ${m.isRead ? 'font-medium text-[#021335]' : 'font-bold text-[#021335]'}`}>
                          {m.name} {m.subject ? `— ${m.subject}` : ''}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">{m.email} {m.phone ? `• ${m.phone}` : ''}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-3">{formatDate(m.createdAt)}</span>
                  </button>

                  {expandedMessageId === m._id && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700 bg-slate-50 border rounded-lg p-3 whitespace-pre-wrap">
                        {m.message}
                      </p>
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() => handleDeleteMessage(m._id, m.name)}
                          className="text-red-600 font-bold text-sm hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="bg-slate-50 border p-6 rounded-2xl mt-8">
          <h2 className="text-xl font-bold mb-4 text-[#1A49C9]">Manage Admins</h2>

          <form onSubmit={handleCreateAdmin} className="grid md:grid-cols-4 gap-4 items-end bg-white p-4 rounded-xl border">
            <div>
              <label className="block text-xs font-bold mb-1">Name</label>
              <input type="text" value={adminName} onChange={e => setAdminName(e.target.value)} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. Priya Sharma" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Email</label>
              <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full border p-2 rounded-lg text-sm" placeholder="admin@pujaprinters.com" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Password</label>
              <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="w-full border p-2 rounded-lg text-sm" placeholder="At least 6 characters" />
            </div>
            <button type="submit" className="bg-[#1A49C9] text-white px-6 py-2 rounded-xl font-bold text-sm h-fit">
              Add Admin
            </button>
          </form>

          <div className="mt-6 space-y-2">
            {admins.length === 0 && (
              <p className="text-sm text-gray-500 bg-white p-4 rounded-xl border text-center">No admins found.</p>
            )}
            {admins.map((a) => (
              <div key={a._id} className="flex justify-between items-center bg-white p-4 rounded-xl border">
                <div>
                  <h4 className="font-bold text-[#021335]">
                    {a.name} {currentAdmin?.id === a._id && <span className="text-xs text-[#1A49C9] font-semibold ml-1">(you)</span>}
                  </h4>
                  <p className="text-xs text-gray-500">{a.email}</p>
                </div>
                {currentAdmin?.id !== a._id && (
                  <button
                    onClick={() => handleDeleteAdmin(a._id, a.name)}
                    className="text-red-600 font-bold text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div >
  );
};

export default AdminPanel;