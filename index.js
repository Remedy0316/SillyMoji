// SillyMoji - Kaomoji Picker Extension for SillyTavern
// Adds a kaomoji picker button to the right side of the chat input bar.

import { extension_settings, getContext } from '../../../extensions.js';
import { saveSettingsDebounced } from '../../../../script.js';

const extensionName = 'third-party/SillyMoji';
const defaultSettings = {
    enabled: true,
};

const settingsHtml = `
<div id="sillymoji_settings" class="sillymoji-settings">
    <div class="inline-drawer">
        <div class="inline-drawer-toggle inline-drawer-header">
            <b>SillyMoji</b>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
        </div>
        <div class="inline-drawer-content">
            <div class="sillymoji-settings-content">
                <label class="checkbox_label" for="sillymoji_enabled">
                    <input type="checkbox" id="sillymoji_enabled" />
                    <span>Enable Kaomoji Picker</span>
                </label>
                <span class="sillymoji-settings-note">
                    Shows the <b>ツ</b> button on the chat input bar for quick kaomoji insertion.
                </span>
            </div>
        </div>
    </div>
</div>
`;

function loadSettings() {
    extension_settings[extensionName] = extension_settings[extensionName] || {};
    if (Object.keys(extension_settings[extensionName]).length === 0) {
        Object.assign(extension_settings[extensionName], defaultSettings);
    }
    $('#sillymoji_enabled').prop('checked', extension_settings[extensionName].enabled);
    toggleExtension(extension_settings[extensionName].enabled);
}

function toggleExtension(enabled) {
    if (enabled) {
        $('#sillymoji-wrapper').show();
    } else {
        closePicker();
        $('#sillymoji-wrapper').hide();
    }
}

function onEnabledChange() {
    const enabled = $('#sillymoji_enabled').is(':checked');
    extension_settings[extensionName].enabled = enabled;
    saveSettingsDebounced();
    toggleExtension(enabled);
}

const KAOMOJI = {
    'Happy': [
        '(◕‿◕)', '(✿◠‿◠)', 'ヽ(>∀<☆)ノ', '(≧▽≦)', '(◠‿◠)', '(☆▽☆)',
        '(✧ω✧)', '(＾▽＾)', '٩(◕‿◕｡)۶', '(ノ´ヮ`)ノ*: ・゚✧', '(⌒‿⌒)',
        '☆*:.｡.o(≧▽≦)o.｡.:*☆', '(｡♥‿♥｡)', 'ヽ(♡‿♡)ノ', '(◕ᴗ◕✿)',
        '(✯◡✯)', '(◠‿◠✿)', '(ᵔᴥᵔ)', '(*≧ω≦)', '(∗´꒳`)',
        '(ˊᗜˋ*)', '(*´▽`*)', '(◦˘ ³(♡ˆ‿ˆ))', '(ㆁωㆁ)', '(◕ᗜ◕)',
        '(＠＾◡＾)', '(。・ω・。)', '(◠ᴗ◠✿)', '(∩❛ڡ❛∩)', '(ᗒᗨᗕ)',
        '٩(^‿^)۶', '(*^‿^*)', '(◡‿◡✿)', '✿(◕ᗜ◕)✿', '(*≧∀≦*)',
        '(๑˃̵ᴗ˂̵)و', '(⁀ᗢ⁀)', '(ᵕᴗᵕ✿)', '(✪‿✪)', '♪(´▽`)',
    ],
    'Sad': [
        '(╥_╥)', '(;ω;)', '(T_T)', '(ノ_<。)', '(´;ω;`)',
        '(っ˘̩╭╮˘̩)っ', '(´・ω・`)', '(◞‸◟)', '(｡•́︿•̀｡)', '(இ﹏இ)',
        '(╯︵╰,)', '(˘̩̩̩ε˘̩ƪ)', '( ´_ゝ`)', '〒▽〒', '(T▽T)',
        '(ಥ﹏ಥ)', 'ε(´сω`)з', '(;´༎ຶД༎ຶ`)', '(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥`)',
        '(ノД`)・゜・。', '(μ_μ)', '(´;︵;`)', '(〒﹏〒)', '(｡ŏ﹏ŏ)',
        '(っ╥╯﹏╰╥c)', '(ᗒᗩᗕ)', '(╥﹏╥)', '(⌯˃̶᷄ ﹏ ˂̶᷄⌯)', '｡ﾟ(ﾟ´Д`ﾟ)ﾟ｡',
        '(;﹏;)', '(o;TωT)o', '(ᵕ̣̣̣̣̣̣﹏ᵕ̣̣̣̣̣̣)', '(´;ω;`)ﾉ', '。゜゜(´Ο`) ゜゜。',
    ],
    'Angry': [
        '(╯°□°)╯︵ ┻━┻', '(ノಠ益ಠ)ノ彡┻━┻', '(ง\'̀-\'́)ง', '(≖_≖ )',
        '(ಠ_ಠ)', '(¬_¬)', '(ᗒᗣᗕ)՞', '(╬ Ò﹏Ó)', '(‡▼益▼)',
        'щ(ʘ╻ʘ)щ', '(ᕗ ͠° ਊ ͠° )ᕗ', '(눈_눈)', '(¬▂¬)', '(>_<)',
        '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻', '(ノ°Д°）ノ︵ ┻━┻',
        '(ू˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣ ू)', '凸(¬‿¬)', '(ﾉ`Д)ﾉ', '(╬▔皿▔)╯',
        '(ꐦ°᷄д°᷅)', '(ﾟДﾟ)＜!!', '(｡•̀ᴗ-)✧凸', 'ψ(▼へ▼メ)～→',
        '(○`д´)ﾉｼ', '(◣_◢)', '(`ε´)', '(メ` ロ ´)', '(,,#ﾟДﾟ)',
        'ヽ(`Д´)ノ', '(ꐦ°д°)', '(╬ಠ益ಠ)',
    ],
    'Love': [
        '(♥ω♥*)', '(◍•ᴗ•◍)❤', '(´,,•ω•,,)♡', '♡(◡‿◡)', '(♡˙︶˙♡)',
        '(灬♥ω♥灬)', '(*♡∀♡)', '(´∩｡• ᵕ •｡∩`)', '(⺣◡⺣)♡*',
        '(♡ >ω< ♡)', '(*˘︶˘*).｡*♡', '(✿ ♥‿♥)', '(˘∀˘)/(μ‿μ) ❤',
        '(´♡‿♡`)', '(*¯ ³¯*)♡', '(人 •͈ᴗ•͈)', '♡＾▽＾♡',
        '(●♡∀♡)', '(◕‿◕)♡', '(ɔˆ ³(ˆ⌣ˆc)', '(♡´▽`♡)', '(◍>◡<◍)⋈。✧♡',
        '(*♡ᴗ♡*)', '(ΦωΦ)♡', '(ˆ⌣ˆԅ)', '(◦′ᆺ‵◦) ♬° ✧', '♡(ŐωŐ人)',
        '(∿°○°)∿ ♡', '(ෆ˙ᵕ˙ෆ)♡', '(灬 ˘ ³˘灬)♡', '(´,,•ω•,,)♡ᵕ̈',
        '(´⌣`ʃƪ)', '( ˘ ³˘)♥', '(⁄ ⁄•⁄ω⁄•⁄ ⁄)♡',
    ],
    'Surprise': [
        '(⊙_⊙)', 'Σ(°△°|||)', '(°ロ°) !', '(O_O)', '(゜-゜)',
        'Σ(°Д°)', '(⊙ˍ⊙)', '(o_O)', '!!!(╬⓪益⓪)', '(✧Д✧)',
        '(*°▽°*)', '(ʘᗩʘ\')', 'w(°ｏ°)w', '(○_○)', '(☉_☉)',
        '(ﾟoﾟ)', '(꒪⌓꒪)', 'Σ(꒪△꒪|||)', '(」ﾟДﾟ)」', '(꒪ȏ꒪)',
        '(°△° |||)', '(!_!)', '(◎_◎;)', '(꒪▿꒪)', 'Σ(ﾟДﾟ)',
        '∑(ΦдΦ)!?', '(ΩДΩ)', '(°▽°)?!', '(⊙﹏⊙)', '(ʘ‿ʘ)',
    ],
    'Greeting': [
        '(｡◕‿◕｡)/', 'ヾ(^▽^*)))', '(◕‿◕)ノ', '(*・ω・)ﾉ',
        '(°▽°)/☆', 'ヾ(・ω・)メ', '(＾▽＾)ゞ', '(^-^)ノ',
        '＼(◎o◎)／', '( ´ ▽ ` )ﾉ', '(*≧▽≦)ﾉ', '(°◡°♡)',
        '(ノ´∀`)ノ', '(*´σー`)ノ', '(。・∀・)ノ゛', '(o´ω`o)ﾉ',
        'ヾ(´〇`)ﾉ♪♪♪', '(^-^*)/', 'ヾ(☆▽☆)', '(。´∀`)ﾉ',
        '(ノ≧∀≦)ノ', '(*^o^)ノ', '(✿╹◡╹)ノ☆', 'ヽ(ヅ)ノ',
    ],
    'Shrug': [
        '¯\\_(ツ)_/¯', '┐(´∀`)┌', '╮(╯_╰)╭', '┐(´～`)┌',
        '¯\\(°_o)/¯', '╮(╯▽╰)╭', '┐(˘_˘)┌', '╮( ˘ ▽ ˘ )╭',
        '┐( ˘_˘)┌', '¯\\_( ͡° ͜ʖ ͡°)_/¯',
        '╮(─▽─)╭', '┐(´д`)┌', '¯\\_(⊙_ʖ⊙)_/¯', '╮(′～‵〞)╭',
        '乁( ˙ω˙ )厂', '┐(￣ヘ￣)┌', '╮(╯∀╰)╭', '¯\\_(° ͜ʖ °)_/¯',
        '┐(°,ʊ°)┌', '乁༼☯‿☯✿༽ㄏ',
    ],
    'Animals': [
        '(=^・^=)', 'ʕ•ᴥ•ʔ', '(°◇°♡)', '(⁎˃ᆺ˂)', '(=①ω①=)',
        '(◕ᴥ◕)', 'ʕ·ᴥ·ʔ', '(·ω·)', 'U・ᴥ・U', '(^・ω・^ )',
        '≧◇≦', 'ʕ·ᴥ·ʔ☆', '(=^-ω-^=)', 'ᕦʕ •ᴥ•ʔᕤ', '(ᵔᴥᵔ)',
        '( ̄(エ) ̄)', '(・⊝・)', 'ʕ→ᴥ←ʔ',
        '(=ↀωↀ=)', '(=^‥^=)', 'ʕ ᵔᴥᵔ ʔ', 'ʕ·ᴥ· ʔ♡', '(=✪ᆽ✪=)',
        'ʕ•̀ω•́ʔ✧', '(˵ ͡° ͜ʖ ͡°˵) ʕ•ᴥ•ʔ', '₍ᐢ..ᐢ₎', '(⊃｡•́‿•̀｡)⊃ ʕ•ᴥ•ʔ',
        '▼(´ᴥ`)▼', '(^◕ᴥ◕^)', 'ʕ♡˙ᴥ˙♡ʔ', 'ʕ✿·ᴥ·ʔ', '(^=◕ᴥ◕=^)',
        '(oΦωΦo)', 'ʕ ·ᴥ·ʔ⁾⁾', '(=^_^=)', '~(=^‥^)_旦~',
    ],
    'Table Flip': [
        '(╯°□°)╯︵ ┻━┻', '┬─┬ノ( º _ ºノ)', '(ノ-_-)ノ ~┻━┻',
        '┻━┻ ︵ ¯\\(ツ)/¯ ︵ ┻━┻', '(ノ ゜Д゜)ノ ︵ ┻━┻',
        '┬─┬⃰͡ (ᵔᵕᵔ͜ )', '(ノ͡° ͜ʖ ͡°)ノ︵ ┻━┻', '┬──┬◡ﾉ(° -°ﾉ)',
        '(ノ｀´)ノ ~┻━┻', '(/¯◡ ‿ ◡)/¯ ~ ┻━┻', '(ノ≧∇≦)ノ ︵ ┻━┻',
        '┬─┬⃰͡ (ᵔᵕᵔ͜ ) good table', '(ノ｀Д´)ノ︵ ┻━┻', '(ノTДT)ノ ┫:・\'.',
        '┻━┻ ヘ╰( •̀ε•́ ╰)', '(ノ•̀ o •́)ノ ~ ┻━┻',
    ],
    'Sparkle': [
        '(ノ◕ヮ◕)ノ*:・゚✧', '✧(≖ ◡ ≖✿)', '(ﾉ´ヮ`)ﾉ*: ・゚✧',
        '✧・゚:*✧・゚:*( ͡ᵔ ͜ʖ ͡ᵔ)*:・゚✧*:・゚✧', '.｡*ﾟ+.*.｡(❁´◡`❁)｡.｡:+*',
        '☆ﾟ.*･｡ﾟ', '(✨_✨)', '✧*。٩(ˊᗜˋ*)و✧*。', '⊂(✧ω✧)⊃',
        '˙✧˖°📷 ⁺‧', '(✧ω✧☆)', '☆*:.｡. o(≧▽≦)o .｡.:*☆',
        '✩°｡⋆⸜(ˊᗜˋ˵ )', '(ﾉ>ω<)ﾉ :｡･:*:･ﾟ\'★,｡', '✧˖°.☆',
        '(˶✧‿✧˶)✧', '⁺˚⋆｡°✩₊', '☆★☆(❁ᴗ͈ˬᴗ͈)◞', '✿˘◡˘✿',
        '(*ﾟ▽ﾟ)ノ✨', '(ꈍᴗꈍ)✧', '.·˖✶✦✧(•̀ᴗ•́)',
    ],
    'Lenny': [
        '( ͡° ͜ʖ ͡°)', '( ͡~ ͜ʖ ͡°)', '( ͡° ͜ʖ ͡ °)', '(͠≖ ͜ʖ͠≖)',
        '( ͡ᵔ ͜ʖ ͡ᵔ)', '(☞ ͡° ͜ʖ ͡°)☞', '¯\\_( ͡° ͜ʖ ͡°)_/¯',
        '( ͡° ᴥ ͡° ʋ)', '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
        '( ͡° ͜ʖ ͡ °)つ━☆', '(˵ ͡° ͜ʖ ͡°˵)', '(⟃ ͜ʖ ⟄)',
        'ᕙ( ͡° ͜ʖ ͡°)ᕗ', '( ͡° ͜ʖ( ͡° ͜ʖ ͡°)', '☞ ͡° ͜ʖ ͡°)☞ ☞ ͡° ͜ʖ ͡°)☞',
        '乁( ͡° ͜ʖ ͡°)ㄏ', '( ͡☉ ͜ʖ ͡☉)', '( ͡❛ ͜ʖ ͡❛)',
    ],
    'Nervous': [
        '(⊙_⊙;)', '(°_°;)', '(; ˘_˘)', '(⌒_⌒;)', '(˘̩̩̩ε˘̩̩̩)',
        '(;^ω^)', '(^^;)', 'ヾ(´・ ・`｡)ノ"', '(✿´‸`✿)', '(•ˋ _ ˊ•)',
        '(ᇂ_ᇂ|||)', '(-_-;)・・・', '(^~^;)ゞ', '(；￣Д￣)', '(ꏿ﹏ꏿ;)',
        '(;´Д`)', '(⊙.⊙)', '(˚ ˃̣̣̥⌓˂̣̣̥ )', '(ˊ̥̥̥̥̥ ᗨ ˋ̥̥̥̥̥)',
    ],
    'Dancing': [
        '♪(┌・。・)┌', '♪♪♪ ヽ(ˇ∀ˇ )ゞ', '(ノ˘ ³˘)ノ♬', '₍₍◞( •௰• )◟₎₎',
        'ヾ(⌐■_■)ノ♪', '┌(★ｏ☆)┘♪', '♪└|∵|┐♪', '♪ヽ( ⌒o⌒)人(⌒-⌒ )v ♪',
        'd(⌒ー⌒) グッ!!', '└|ﾟεﾟ|┐', '┌(・。・)┘♪', '♬♩♪◖(● o ●)◗♪♩♬',
        '⁽⁽◝( •௰• )◜⁾⁾', '(〜￣△￣)〜♪♪♪', '(ᐢ ᐢ)⊹♡', '(つ≧▽≦)つ♩♪',
    ],
    'Eating': [
        '(っ˘ڡ˘ς)', '( ˘▽˘)っ♨', '(◕ᴗ◕✿) 🍰', 'いただきます(ᗒᗨᗕ)',
        '(*´ー`)旦 旦', '(o˘◡˘o) ┃🍕', '( ˘ ³˘)🍩', '٩(^‿^)۶🍜',
        '(ノ・ω・)ノ🍣', '( ⓛ ω ⓛ *) ☕', '(❛ᴗ❛人)✧ 🧁', '♡(ŐωŐ人)🍙',
        '(✧ω✧)🍡', '(=ↀωↀ=) 🐟', '(*ΦωΦ)🥤',
    ],
    'Music': [
        '♪(´ε` )', '♬♩♪♩', '♪♫•*¨*•.¸¸♪', 'ヾ(´〇`)ﾉ♪♪♪',
        '(ﾉ´ з `)ノ♬', '♪(＾∇＾)', '₍₍ ◝(●˙꒳˙●)◜ ₎₎♪', '♪⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾♪',
        '♪～(´ε` )', '(˶˃ ᵕ ˂˶) ♪', '♬♪♫ (ᘒᗢᘚ)', '♫꒰・‿・๑꒱',
        '(˶ᵔ ᵕ ᵔ˶)♬', '♩♫♪(ˊᗜˋ*)♪♫♩',
    ],
    'Cute': [
        '(◕ᴗ◕✿)', '(ᵔᴥᵔ)', '(˶ᵔ ᵕ ᵔ˶)', '(ㆁᴗㆁ✿)', '( ˘ᵕ˘ )',
        '(◠ᴗ◠)', '(⁀ᗢ⁀)', '(ᵕᴗᵕ✿)', '(✿˘◡˘✿)', '(・ω・)',
        '(◕‿◕)', '(⁎⁍̴̛ᴗ⁍̴̛⁎)', '(ꈍᴗꈍ)', '(✧ᴗ✧)', '(*ᴗ͈ˬᴗ͈)ꕤ',
        '(◦ˉ ˘ ˉ◦)', '(◍˘ω˘◍)', '( ◜‿◝ )♡', '(◠‿・)—☆', '(◕ω◕✿)',
        '(ˊo̴̶̷̤ ᴗ o̴̶̷̤ˋ)', '(✿ᵔᴗᵔ)', '(ˊᗜˋ)', '(ᴗ͈ˬᴗ͈)♡', '(˃̶͈̀ロ˂̶͈́)੭ꠥ⁾⁾',
        '(´꒳`)♡', '(ᵕ̤ᴗᵕ̤)', '(*˘◡˘*)', '(◍ ´꒳` ◍)', '(✿´ ꒳ ` )',
    ],
    'Shy': [
        '(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '(*/ω＼*)', '(/ω\)',
        '(„ᵕᴗᵕ„)', '(⸝⸝⸝ᵕᴗᵕ⸝⸝⸝)', '(>_<)', '(〃▽〃)', '(*ﾉωﾉ)',
        '(⁄ ⁄ ⁄ω⁄ ⁄ ⁄)⁄', '(≧◡≦)', '(⺣◡⺣)♡', '(,,>﹏<,,)', '(⊙﹏⊙✿)',
        '(✿╹◡╹)', '(´• ω •`) ♡', '(ᵒ̤̑ ₀̑ ᵒ̤̑)', '(,,ᴗ̤ᴗ̤,,)',
        '(ˊ˘ˋ*)', '(⸝⸝⸝°_°⸝⸝⸝)', '(*μ_μ)', '(#⌒∇⌒#)ゞ', '(⁄ ⁄•⁄-⁄•⁄ ⁄)',
        '(〃ω〃)', '(✿ ˘///_///˘)', '(˵ ˃̶̀ε ˂̶́˵)♡', '(*ノωノ)',
        '(⸝⸝ᵕᴗᵕ⸝⸝)', '(✧//ᗜ//✧)', '(⁄ ⁄ˊᗜˋ⁄⁄ ⁄)',
    ],
    'Tired': [
        '_(:з」∠)_', '_(┐「ε:)_', '_(´ཀ`」 ∠)_', '_(:3 」∠)_',
        '(´-ω-`)', '( ˘ω˘ )zzZ', '(-ω-) zzZ', '(∪｡∪)｡｡｡zzZ',
        '(´〜`*) zzz', '_| ̄|○', 'orz', '○|￣|_',
        '(ノ_ _)ノ', '(=_=)', '(-.-)zzZ', '(￣o￣) . z Z',
        '(눈‸눈)', '(´Д`)=3', '(；´Д｀)', '(´～`)'
    ],
};

const CATEGORY_ICONS = {
    'Happy': 'fa-face-laugh-beam',
    'Sad': 'fa-face-sad-tear',
    'Angry': 'fa-face-angry',
    'Love': 'fa-heart',
    'Surprise': 'fa-face-surprise',
    'Greeting': 'fa-hand',
    'Shrug': 'fa-meh',
    'Animals': 'fa-paw',
    'Table Flip': 'fa-table',
    'Sparkle': 'fa-wand-magic-sparkles',
    'Lenny': 'fa-face-grin-wink',
    'Nervous': 'fa-face-grimace',
    'Dancing': 'fa-music',
    'Eating': 'fa-utensils',
    'Music': 'fa-headphones',
    'Cute': 'fa-star',
    'Shy': 'fa-face-flushed',
    'Tired': 'fa-bed',
};

let pickerOpen = false;
let activeCategory = 'Happy';
let recentKaomoji = [];

const MAX_RECENT = 20;
const STORAGE_KEY = 'sillymoji_recent';

function loadRecent() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            recentKaomoji = JSON.parse(saved);
        }
    } catch {
        recentKaomoji = [];
    }
}

function saveRecent() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentKaomoji));
}

function addToRecent(kaomoji) {
    recentKaomoji = recentKaomoji.filter(k => k !== kaomoji);
    recentKaomoji.unshift(kaomoji);
    if (recentKaomoji.length > MAX_RECENT) {
        recentKaomoji = recentKaomoji.slice(0, MAX_RECENT);
    }
    saveRecent();
}

function insertKaomoji(kaomoji) {
    const textarea = $('#send_textarea');
    if (!textarea.length) return;

    const el = textarea[0];
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const before = text.substring(0, start);
    const after = text.substring(end);

    // Add space before if there's text and no trailing space
    const spaceBefore = before.length > 0 && !before.endsWith(' ') && !before.endsWith('\n') ? ' ' : '';
    const newText = before + spaceBefore + kaomoji + after;

    el.value = newText;
    el.focus();

    const cursorPos = start + spaceBefore.length + kaomoji.length;
    el.selectionStart = cursorPos;
    el.selectionEnd = cursorPos;

    // Trigger input event so SillyTavern registers the change
    textarea.trigger('input');

    addToRecent(kaomoji);
    closePicker();
}

function buildCategoryTabs() {
    let html = '<div class="sillymoji-tab" data-category="Recent"><i class="fa-solid fa-clock-rotate-left"></i></div>';
    for (const [name, icon] of Object.entries(CATEGORY_ICONS)) {
        const activeClass = name === activeCategory ? ' active' : '';
        html += `<div class="sillymoji-tab${activeClass}" data-category="${name}" title="${name}"><i class="fa-solid ${icon}"></i></div>`;
    }
    return html;
}

function buildKaomojiGrid(category) {
    const list = category === 'Recent' ? recentKaomoji : (KAOMOJI[category] || []);
    if (list.length === 0) {
        return '<div class="sillymoji-empty">No recent kaomoji yet!</div>';
    }
    let html = list.map(k => `<div class="sillymoji-item" title="Click to insert">${k}</div>`).join('');
    if (category === 'Recent') {
        html += '<div class="sillymoji-clear-recent" title="Clear recent history"><i class="fa-solid fa-trash-can"></i> Clear</div>';
    }
    return html;
}

function clearRecent() {
    recentKaomoji = [];
    saveRecent();
    $('.sillymoji-grid').html(buildKaomojiGrid('Recent'));
}

function buildSearchResults(query) {
    const lower = query.toLowerCase();
    const results = [];
    for (const [cat, list] of Object.entries(KAOMOJI)) {
        if (cat.toLowerCase().includes(lower)) {
            results.push(...list);
        }
    }
    // Also search in the kaomoji themselves
    if (results.length === 0) {
        for (const list of Object.values(KAOMOJI)) {
            for (const k of list) {
                if (k.toLowerCase().includes(lower)) {
                    results.push(k);
                }
            }
        }
    }
    if (results.length === 0) {
        return '<div class="sillymoji-empty">No kaomoji found (╥_╥)</div>';
    }
    return results.map(k => `<div class="sillymoji-item" title="Click to insert">${k}</div>`).join('');
}

function buildPicker() {
    return `
        <div id="sillymoji-picker">
            <div class="sillymoji-header">
                <div class="sillymoji-search-wrap">
                    <i class="fa-solid fa-magnifying-glass sillymoji-search-icon"></i>
                    <input type="text" id="sillymoji-search" placeholder="Search categories..." autocomplete="off" />
                </div>
            </div>
            <div class="sillymoji-tabs">
                ${buildCategoryTabs()}
            </div>
            <div class="sillymoji-grid">
                ${buildKaomojiGrid(activeCategory)}
            </div>
        </div>
    `;
}

function openPicker() {
    if (pickerOpen) {
        closePicker();
        return;
    }

    $('#sillymoji-picker').remove();

    const pickerHtml = buildPicker();
    $('#sillymoji-wrapper').append(pickerHtml);

    // Force backdrop blur even when global blur is disabled
    if (!document.getElementById('sillymoji-blur-override')) {
        const style = document.createElement('style');
        style.id = 'sillymoji-blur-override';
        style.textContent = `
            body #sillymoji-picker {
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Bind events
    $('.sillymoji-tab').on('click', function () {
        const category = $(this).data('category');
        activeCategory = category;
        $('.sillymoji-tab').removeClass('active');
        $(this).addClass('active');
        $('.sillymoji-grid').html(buildKaomojiGrid(category));
        $('#sillymoji-search').val('');
        bindGridItems();
    });

    $('#sillymoji-search').on('input', function () {
        const query = $(this).val().trim();
        if (query.length === 0) {
            $('.sillymoji-grid').html(buildKaomojiGrid(activeCategory));
            $('.sillymoji-tab').removeClass('active');
            $(`.sillymoji-tab[data-category="${activeCategory}"]`).addClass('active');
        } else {
            $('.sillymoji-grid').html(buildSearchResults(query));
            $('.sillymoji-tab').removeClass('active');
        }
        bindGridItems();
    });

    bindGridItems();
    pickerOpen = true;
    $('#sillymoji_button').addClass('active');
}

function bindGridItems() {
    $('.sillymoji-item').off('click').on('click', function () {
        insertKaomoji($(this).text());
    });
    $('.sillymoji-clear-recent').off('click').on('click', function () {
        clearRecent();
    });
}

function closePicker() {
    $('#sillymoji-picker').remove();
    pickerOpen = false;
    $('#sillymoji_button').removeClass('active');
}

// Close picker when clicking outside
$(document).on('click', function (e) {
    if (pickerOpen && !$(e.target).closest('#sillymoji-picker, #sillymoji_button').length) {
        closePicker();
    }
});

// Close picker on Escape
$(document).on('keydown', function (e) {
    if (e.key === 'Escape' && pickerOpen) {
        closePicker();
    }
});

// Init
jQuery(async () => {
    loadRecent();

    // Add settings panel to the Extensions menu (left side)
    $('#extensions_settings').append(settingsHtml);
    $('#sillymoji_enabled').on('change', onEnabledChange);

    const wrapper = $('<div id="sillymoji-wrapper"></div>');
    const button = $(`
        <div id="sillymoji_button" class="interactable" title="Kaomoji Picker" tabindex="0">
            <span class="sillymoji-btn-icon">ツ</span>
        </div>
    `);

    wrapper.append(button);
    $('#rightSendForm').prepend(wrapper);

    button.on('click', (e) => {
        e.stopPropagation();
        openPicker();
    });

    // Load settings after UI is in place
    loadSettings();
});
