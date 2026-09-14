import urllib.request
import json
import time
import html

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Referer": "https://www.bilibili.com",
    "Accept": "application/json, text/plain, */*"
}

ep_aid = {
    8: (117024017618229, "BV1fk3X6CEXb", "第08期 屎山论剑｜DeepSeekV4Flash：下一位！"),
    9: (117105152236302, "BV1HzbX6tEvR", "第09期 开源AI闭源AI决战屎山之巅｜屎山论剑"),
    10: (117183434726992, "BV1mu4X6cEkD", "第10期 谁是模型斩杀线，来看屎山大论剑｜屎山论剑"),
    11: (117234588587650, "BV1R2b56uEK7", "第11期 来屎山之巅，看GPT6和Fable5.1神仙打架｜屎山论剑"),
    12: (117256667405655, "BV1eCYD6QEqS", "第12期 四家Flash大乱斗，挑战屎山代码｜屎山论剑")
}

with open("src/data/realBilibiliComments.json") as f:
    all_comments = json.load(f)

existing_ids = set(c["id"] for c in all_comments)
new_added = 0

for ep, (aid, bvid, title) in ep_aid.items():
    roots = [c for c in all_comments if c["episode"] == ep and not c["isSubReply"]]
    for r in roots:
        rpid = r["id"]
        u_name = r["userName"]
        time.sleep(0.8)
        sub_url = f"https://api.bilibili.com/x/v2/reply/reply?type=1&oid={aid}&root={rpid}&pn=1&ps=20"
        req = urllib.request.Request(sub_url, headers=headers)
        try:
            with urllib.request.urlopen(req) as resp:
                d = json.loads(resp.read().decode())
                replies = (d.get("data") or {}).get("replies") or []
                print(f"Ep {ep} root {rpid} ({u_name}): got {len(replies)} sub-replies")
                for sr in replies:
                    s_id = str(sr.get("rpid"))
                    if s_id not in existing_ids:
                        mem = sr.get("member", {})
                        content = sr.get("content", {})
                        r_ctrl = sr.get("reply_control", {})
                        uname = mem.get("uname", "B站网友")
                        avatar = mem.get("avatar", "")
                        if avatar.startswith("http://"):
                            avatar = "https://" + avatar[7:]
                        msg = html.unescape(content.get("message", "").strip())
                        all_comments.append({
                            "id": s_id,
                            "episode": ep,
                            "episodeTitle": title,
                            "bvid": bvid,
                            "userName": uname,
                            "userAvatar": avatar,
                            "userLevel": mem.get("level_info", {}).get("current_level", 5),
                            "likeCount": sr.get("like", 0),
                            "replyCount": sr.get("rcount", 0),
                            "timeDesc": r_ctrl.get("time_desc", ""),
                            "isUpTop": False,
                            "isUpLike": bool(r_ctrl.get("up_like")),
                            "isUpAuthor": uname == "Token就是词元",
                            "isSubReply": True,
                            "rootId": rpid,
                            "message": msg
                        })
                        existing_ids.add(s_id)
                        new_added += 1
        except Exception as e:
            print(f"Err {ep}: {e}")

print(f"New added: {new_added}, total now: {len(all_comments)}")

if new_added > 0:
    with open("src/data/realBilibiliComments.json", "w", encoding="utf-8") as f:
        json.dump(all_comments, f, ensure_ascii=False, indent=2)
    
    ts_content = """export interface RealBilibiliComment {
  id: string;
  episode: number;
  episodeTitle: string;
  bvid: string;
  userName: string;
  userAvatar: string;
  userLevel: number;
  likeCount: number;
  replyCount: number;
  timeDesc: string;
  isUpTop: boolean;
  isUpLike: boolean;
  isUpAuthor: boolean;
  isSubReply: boolean;
  rootId: string | null;
  message: string;
}

export const REAL_BILIBILI_COMMENTS: RealBilibiliComment[] = """ + json.dumps(all_comments, ensure_ascii=False, indent=2) + ";\n"

    with open("src/data/realBilibiliComments.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
