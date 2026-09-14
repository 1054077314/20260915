import urllib.request
import json
import time

videos = [
  {"ep": 1, "bv": "BV1smTi6aE6J", "aid": 116845558438138, "title": "第01期 祖传BUG，屎山论剑｜国模AI选拔赛"},
  {"ep": 2, "bv": "BV1okM86eEwi", "aid": 116878055839344, "title": "第02期 LongCat2.0发布：美团龙猫，请直面屎山代码！"},
  {"ep": 3, "bv": "BV1etMJ6NEd4", "aid": 116889011492105, "title": "第03期 HY3.0！你终究还是要面对屎山代码的考验！"},
  {"ep": 4, "bv": "BV1KeN76rEJ9", "aid": 116894933721041, "title": "第04期 Grok4.5！从火星来的AI！到屎山去改BUG！"},
  {"ep": 5, "bv": "BV1QNKw6uE3L", "aid": 116940114825302, "title": "第05期 Kimi-K3｜实战祖传代码｜代表月亮！照亮屎山！"},
  {"ep": 6, "bv": "BV1vrgQ6aEJU", "aid": 116968468256518, "title": "第06期 请接受《屎山》的检验｜Qwen3.8Max｜Gemini3.6Flash"},
  {"ep": 7, "bv": "BV1893x6HE7s", "aid": 117008683243189, "title": "第07期 屎山论剑｜中美AI！决战屎山之巅！"},
  {"ep": 8, "bv": "BV1fk3X6CEXb", "aid": 117024017618229, "title": "第08期 屎山论剑｜DeepSeekV4Flash：下一位！"},
  {"ep": 9, "bv": "BV1HzbX6tEvR", "aid": 117105152236302, "title": "第09期 开源AI闭源AI决战屎山之巅｜屎山论剑"},
  {"ep": 10, "bv": "BV1mu4X6cEkD", "aid": 117183434726992, "title": "第10期 谁是模型斩杀线，来看屎山大论剑｜屎山论剑"},
  {"ep": 11, "bv": "BV1R2b56uEK7", "aid": 117234588587650, "title": "第11期 来屎山之巅，看GPT6和Fable5.1神仙打架｜屎山论剑"},
  {"ep": 12, "bv": "BV1eCYD6QEqS", "aid": 117256667405655, "title": "第12期 四家Flash大乱斗，挑战屎山代码｜屎山论剑"}
]

headers = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    "Referer": "https://www.bilibili.com",
    "Accept": "application/json, text/plain, */*"
}

all_comments = []

def parse_comment(c, ep_num, ep_title, bvid, is_sub=False, root_id=None):
    mem = c.get("member", {})
    content = c.get("content", {})
    r_ctrl = c.get("reply_control", {})
    
    msg = content.get("message", "").strip()
    if not msg:
        return None
        
    uname = mem.get("uname", "B站网友")
    avatar = mem.get("avatar", "")
    # replace http with https for avatars
    if avatar.startswith("http://"):
        avatar = "https://" + avatar[7:]
        
    return {
        "id": str(c.get("rpid")),
        "episode": ep_num,
        "episodeTitle": ep_title,
        "bvid": bvid,
        "userName": uname,
        "userAvatar": avatar,
        "userLevel": mem.get("level_info", {}).get("current_level", 5),
        "likeCount": c.get("like", 0),
        "replyCount": c.get("rcount", 0),
        "timeDesc": r_ctrl.get("time_desc", ""),
        "isUpTop": bool(r_ctrl.get("is_up_top")),
        "isUpLike": bool(r_ctrl.get("up_like")),
        "isUpAuthor": uname == "Token就是词元",
        "isSubReply": is_sub,
        "rootId": str(root_id) if root_id else None,
        "message": msg
    }

for v in videos:
    aid = v["aid"]
    ep_num = v["ep"]
    ep_title = v["title"]
    bvid = v["bv"]
    
    # 1. Fetch main root comments
    url = f"https://api.bilibili.com/x/v2/reply?type=1&oid={aid}&pn=1&ps=20&sort=2"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            data_body = data.get("data") or {}
            replies = data_body.get("replies") or []
            upper_top = data_body.get("upper", {}).get("top")
            
            roots_to_process = []
            if upper_top:
                parsed_top = parse_comment(upper_top, ep_num, ep_title, bvid)
                if parsed_top:
                    parsed_top["isUpTop"] = True
                    all_comments.append(parsed_top)
                    roots_to_process.append(upper_top)
                    
            for r in replies:
                if upper_top and r.get("rpid") == upper_top.get("rpid"):
                    continue
                parsed = parse_comment(r, ep_num, ep_title, bvid)
                if parsed:
                    all_comments.append(parsed)
                    roots_to_process.append(r)
            
            # 2. Fetch sub-replies for each root comment
            for r in roots_to_process:
                root_rpid = r.get("rpid")
                rcount = r.get("rcount", 0)
                if root_rpid and rcount > 0:
                    time.sleep(0.15)
                    sub_url = f"https://api.bilibili.com/x/v2/reply/reply?type=1&oid={aid}&root={root_rpid}&pn=1&ps=15"
                    sub_req = urllib.request.Request(sub_url, headers=headers)
                    try:
                        with urllib.request.urlopen(sub_req) as sub_resp:
                            sub_data = json.loads(sub_resp.read().decode())
                            sub_replies = (sub_data.get("data") or {}).get("replies") or []
                            for sr in sub_replies:
                                parsed_sr = parse_comment(sr, ep_num, ep_title, bvid, is_sub=True, root_id=root_rpid)
                                if parsed_sr:
                                    all_comments.append(parsed_sr)
                    except Exception as err_sub:
                        pass
                        
        print(f"Done Episode {ep_num}: running total = {len(all_comments)} comments")
        time.sleep(0.2)
    except Exception as e:
        print(f"Error episode {ep_num}: {e}")

print(f"\nFinal scraped real comments count: {len(all_comments)}")
with open("src/data/realBilibiliComments.json", "w", encoding="utf-8") as f:
    json.dump(all_comments, f, ensure_ascii=False, indent=2)
