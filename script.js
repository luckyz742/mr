document.addEventListener('DOMContentLoaded', () => {
    // --- 视图和元素定义 ---
    const views = {
        lockScreenElements: document.getElementById('lockScreenElements'),
        homeScreen: document.getElementById('homeScreen'),
        wechatApp: document.getElementById('wechatApp'), 
        xiaomingChatView: document.getElementById('xiaomingChatView'), 
        redPacketView: document.getElementById('redPacketView'), 
        transferView: document.getElementById('transferView'), 
        wechatContactProfile: document.getElementById('wechatContactProfile'), 
        memoApp: document.getElementById('memoApp'), 
    };
    
    // 锁屏/主页元素
    const keypad = document.querySelector('.keypad');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const appIcons = document.querySelectorAll('.app-icon');
    const statusBar = document.getElementById('statusBar'); 

    // 微信元素
    const messageListContent = document.getElementById('messageListContent');
    const contactListContent = document.getElementById('contactListContent');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatWindow = document.getElementById('chatWindow');
    const showMenuBtn = document.getElementById('showMenuBtn');
    const chatMenu = document.getElementById('chatMenu');
    let messageClickCount = 0; 
    
    // 红包/转账元素
    const redPacketAmount = document.getElementById('redPacketAmount');
    const redPacketNote = document.getElementById('redPacketNote');
    const sendRedPacketBtn = document.getElementById('sendRedPacketBtn');
    const transferAmount = document.getElementById('transferAmount');
    const transferNote = document.getElementById('transferNote');
    const sendTransferBtn = document.getElementById('sendTransferBtn');
    
    // 当前聊天对象
    let currentChatContact = null;

    // 锁屏密码逻辑变量
    let passwordLength = 0;
    let enteredPassword = ""; 
    const maxPasswordLength = indicatorDots.length;
    const CORRECT_PASSWORD = "123456"; 

    // --- 微信联系人数据 ---
    const CONTACTS = [
        { id: 'xiaoming', name: '小明', avatar: 'https://i.postimg.cc/nrZH5jZm/1762874639457.jpg', id_num: 'wxID: xiaoming99', lastMessage: '在吗？项目资料发给我。', time: '17:45', unread: 2 },
        { id: 'boss', name: '老板', avatar: 'https://i.postimg.cc/0QT3Q2s6/1762874632393.jpg', id_num: 'wxID: BossLee', lastMessage: '周末记得处理一下。', time: '昨天', unread: 0 },
        { id: 'family', name: '家人群', avatar: 'https://i.postimg.cc/cLxz6bV3/1762887633550.jpg', id_num: '群聊', lastMessage: '[图片]', time: '周二', unread: 5 },
    ];
    // 我方头像
    const MY_AVATAR = 'https://i.postimg.cc/VvXhbQsz/1762887734493.jpg';

    // --- 核心函数：视图切换 ---
    function showView(viewId) {
        Object.values(views).forEach(view => {
            // 确保所有的 view 都被隐藏
            view.style.display = 'none';
        });

        const targetView = views[viewId];
        if (targetView) {
            // 锁屏和主页是 block，其他是 flex
            targetView.style.display = (viewId === 'lockScreenElements' || viewId === 'homeScreen') ? 'block' : 'flex';
        }

        // 状态栏颜色控制
        if (viewId === 'lockScreenElements' || viewId === 'homeScreen') {
            statusBar.style.color = '#fff';
            statusBar.style.backgroundColor = 'transparent'; 
        } else {
            statusBar.style.color = '#333';
            statusBar.style.backgroundColor = '#fff'; 
        }
        
        // 渲染或清理工作
        if (viewId === 'wechatApp') {
            renderMessageList();
            renderContactList();
        }
    }
    
    // --- 1. 锁屏键盘逻辑 (修复重点) ---
    keypad.addEventListener('click', (e) => {
        const key = e.target.closest('.key');
        if (!key) return;

        const value = key.getAttribute('data-value');

        if (value === 'delete') {
            if (passwordLength > 0) {
                passwordLength--;
                enteredPassword = enteredPassword.slice(0, -1);
                indicatorDots[passwordLength].classList.remove('active');
            }
        } else if (value && passwordLength < maxPasswordLength) {
            enteredPassword += value;
            indicatorDots[passwordLength].classList.add('active');
            passwordLength++;

            if (passwordLength === maxPasswordLength) {
                // 检查密码
                if (enteredPassword === CORRECT_PASSWORD) {
                    showView('homeScreen');
                    enteredPassword = "";
                    passwordLength = 0;
                    indicatorDots.forEach(dot => dot.classList.remove('active'));
                } else {
                    // 密码错误：视觉提示并重置
                    const indicatorDiv = document.querySelector('.password-indicator');
                    indicatorDiv.style.border = '1px solid red'; 
                    
                    setTimeout(() => {
                        indicatorDiv.style.border = 'none';
                        // 重置
                        enteredPassword = "";
                        passwordLength = 0;
                        indicatorDots.forEach(dot => dot.classList.remove('active'));
                    }, 500);
                }
            }
        }
    });

    // --- 2. App 点击逻辑：启动 App ---
    appIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const appKey = icon.getAttribute('data-app');
            switch (appKey) {
                case 'wechat':
                case 'xiaoming-chat': 
                    showView('wechatApp');
                    showWechatView('wechatMessages'); 
                    break;
                case 'memo':
                     showView('memoApp');
                     break;
                default:
                    alert(`正在打开 App: ${appKey} (界面尚未制作)`);
                    break;
            }
        });
    });

    // --- 3. 微信 Tab Bar 逻辑 ---
    const showWechatView = (newViewId) => {
        document.querySelectorAll('#wechatApp .wechat-sub-view').forEach(view => {
            view.style.display = 'none';
        });

        const newView = document.getElementById(newViewId);
        if (newView) {
            newView.style.display = 'flex';
        }

        document.querySelectorAll('.tab-bar .tab-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-view') === newViewId) {
                item.classList.add('active');
            }
        });
    };

    document.querySelectorAll('.tab-bar .tab-item').forEach(item => {
        item.addEventListener('click', () => {
            const viewId = item.getAttribute('data-view');
            showWechatView(viewId);
        });
    });

    // --- 4. 返回按钮逻辑 ---
    document.querySelectorAll('.header .back-to-home-btn').forEach(btn => {
        btn.addEventListener('click', () => { showView('homeScreen'); });
    });
    
    document.querySelector('.back-to-messages-btn').addEventListener('click', () => {
        showView('wechatApp');
        showWechatView('wechatMessages');
    });

    document.querySelector('.back-to-contacts-btn').addEventListener('click', () => {
        showView('wechatApp');
        showWechatView('wechatContacts');
    });

    document.querySelectorAll('.back-to-chat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
             showView('xiaomingChatView');
             chatWindow.scrollTop = chatWindow.scrollHeight;
        });
    });

    // --- 5. 消息列表渲染 ---
    const renderMessageList = () => {
        messageListContent.innerHTML = ''; 
        CONTACTS.forEach(contact => {
            const item = document.createElement('div');
            item.className = 'message-list-item';
            item.setAttribute('data-id', contact.id);
            item.innerHTML = `
                <div class="list-avatar">
                    <img src="${contact.avatar}" alt="${contact.name}头像">
                    ${contact.unread > 0 ? `<div class="unread-badge">${contact.unread}</div>` : ''}
                </div>
                <div class="list-details">
                    <div class="list-header">
                        <span class="list-name">${contact.name}</span>
                        <span class="list-time">${contact.time}</span>
                    </div>
                    <div class="list-last-message">${contact.lastMessage}</div>
                </div>
            `;
            messageListContent.appendChild(item);
            item.addEventListener('click', () => { openChatView(contact.id, contact.name); });
        });
    };
    
    // --- 6. 联系人列表渲染 ---
    const renderContactList = () => {
        contactListContent.innerHTML = '<div style="height: 15px;"></div>'; 
        CONTACTS.forEach(contact => {
            const item = document.createElement('div');
            item.className = 'message-list-item'; 
            item.setAttribute('data-id', contact.id);
            item.innerHTML = `
                <div class="list-avatar" style="border-radius: 8px;">
                    <img src="${contact.avatar}" alt="${contact.name}头像">
                </div>
                <div class="list-details" style="justify-content: center;">
                    <span class="list-name" style="max-width: 100%;">${contact.name}</span>
                </div>
            `;
            contactListContent.appendChild(item);
            item.addEventListener('click', () => { openContactProfile(contact.id); });
        });
    };
    
    // --- 7. 打开联系人资料页 ---
    const openContactProfile = (contactId) => {
        const contact = CONTACTS.find(c => c.id === contactId);
        if (!contact) return;

        document.getElementById('profileAvatar').src = contact.avatar;
        document.getElementById('profileName').textContent = contact.name;
        document.getElementById('profileID').textContent = contact.id_num;

        showView('wechatApp');
        document.querySelectorAll('#wechatApp .wechat-sub-view').forEach(view => {
             view.style.display = 'none';
        });
        views.wechatContactProfile.style.display = 'flex';
        
        document.querySelector('.send-message-btn').onclick = () => {
            openChatView(contact.id, contact.name);
        };
        document.querySelector('.delete-friend-btn').onclick = () => {
            alert(`已删除好友: ${contact.name}`);
        };
    };

    // --- 8. 打开聊天视图 ---
    const openChatView = (contactId, contactName) => {
        currentChatContact = CONTACTS.find(c => c.id === contactId); 
        showView('xiaomingChatView'); 
        document.getElementById('chatTitle').textContent = contactName;
        setTimeout(() => { chatWindow.scrollTop = chatWindow.scrollHeight; }, 50);
    };


    // --- 9. 聊天气泡创建辅助函数 ---
    const createMessageBubble = (content, type) => {
        const row = document.createElement('div');
        row.className = `chat-message-row ${type}`;

        const avatarSrc = type === 'sent' ? MY_AVATAR : currentChatContact.avatar;
        
        row.innerHTML = `
            <div class="chat-avatar"><img src="${avatarSrc}" alt="${type === 'sent' ? '我方' : '对方'}头像"></div>
            <div class="message-bubble">${content}</div>
        `;
        chatWindow.appendChild(row);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    // --- 10. 聊天发送逻辑 ---
    const sendMessage = (e) => {
        const message = chatInput.value.trim();
        if (message === "") return;

        messageClickCount++;
        if (messageClickCount === 1) {
            createMessageBubble(message, 'sent');
            chatInput.value = ''; 
            setTimeout(() => {
                if (messageClickCount === 1) {
                    messageClickCount = 0; 
                    simulateReply(message); 
                }
            }, 500);
        } else if (messageClickCount === 2) {
            messageClickCount = 0;
            simulateReply(message);
        }
    };

    // 模拟对方回复 (含思考中的波动省略号)
    const simulateReply = (originalMessage) => {
        // 1. 模拟思考中 (使用波动省略号)
        const thinkingContent = '<div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div>'; 
        createMessageBubble(thinkingContent, 'received');
        const thinkingBubble = chatWindow.lastChild.querySelector('.message-bubble');
        thinkingBubble.classList.add('thinking-bubble'); 

        setTimeout(() => {
            // 2. 移除思考中
            chatWindow.removeChild(chatWindow.lastChild);

            // 3. 发送正式回复
            const reply = "我已收到您的消息: \"" + originalMessage + "\".";
            createMessageBubble(reply, 'received');

        }, 2500);
    }
    
    // 监听发送按钮点击
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }

    // 监听回车键
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                createMessageBubble(chatInput.value.trim(), 'sent');
                simulateReply(chatInput.value.trim());
                chatInput.value = '';
            }
        });
    }

    // --- 11. 聊天菜单逻辑 ---
    showMenuBtn.addEventListener('click', () => {
        chatMenu.classList.toggle('active');
    });

    // 监听菜单项点击
    document.querySelectorAll('#chatMenu .menu-item').forEach(item => {
        item.addEventListener('click', () => {
            chatMenu.classList.remove('active'); 
            const action = item.getAttribute('data-action');
            if (action === 'red-packet') {
                showView('redPacketView');
            } else if (action === 'transfer') {
                showView('transferView');
            } else {
                 alert(`点击了：${item.querySelector('span').textContent}，但功能尚未实现。`);
            }
        });
    });

    // --- 12. 红包发送逻辑 ---
    sendRedPacketBtn.addEventListener('click', () => {
        const amount = redPacketAmount.value;
        const note = redPacketNote.value || '恭喜发财，大吉大利';
        if (!amount || parseFloat(amount) <= 0) {
            alert('请输入有效金额！');
            return;
        }

        const content = `
            <div class="red-packet-bubble">
                <div class="amount">
                    <i class="fas fa-money-bill-alt" style="margin-right: 8px;"></i>微信红包
                </div>
                <div class="note">${note}</div>
                <div style="font-size: 10px; opacity: 0.6; position: absolute; bottom: 5px; right: 10px;">查看红包</div>
            </div>
        `;
        createMessageBubble(content, 'sent');
        
        redPacketAmount.value = '';
        redPacketNote.value = '';
        showView('xiaomingChatView');
    });

    // --- 13. 转账发送逻辑 ---
    sendTransferBtn.addEventListener('click', () => {
        const amount = transferAmount.value;
        const note = transferNote.value || '转账';
        if (!amount || parseFloat(amount) <= 0) {
            alert('请输入有效金额！');
            return;
        }

        const content = `
            <div class="transfer-bubble">
                <div class="amount">
                    <i class="fas fa-yen-sign" style="margin-right: 5px;"></i> ${amount}
                </div>
                <div class="note">${note}</div>
                 <div style="font-size: 10px; opacity: 0.6; position: absolute; bottom: 5px; right: 10px;">待确认</div>
            </div>
        `;
        createMessageBubble(content, 'sent');
        
        transferAmount.value = '';
        transferNote.value = '';
        showView('xiaomingChatView');
    });

    // --- 14. 初始化：显示锁屏界面 ---
    showView('lockScreenElements'); 
});
